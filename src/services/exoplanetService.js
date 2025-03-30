// URL base para la API TAP de exoplanetas
const API_BASE_URL = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync';

/**
 * Realiza una consulta personalizada a la API de exoplanetas
 * @param {string} consulta - Consulta ADQL (similar a SQL)
 * @param {number} limite - Número máximo de resultados a devolver
 * @param {string} formato - Formato de respuesta (json, csv, etc.)
 * @returns {Promise} - Promesa con los resultados
 */
export async function consultarExoplanetas(consulta, limite = 100, formato = 'json') {
  try {
    // Limitar la consulta si es necesario
    if (limite) {
      // Verificar si la consulta ya tiene una cláusula LIMIT
      if (!consulta.toLowerCase().includes('limit')) {
        consulta = `${consulta} LIMIT ${limite}`;
      }
    }
    
    // Codificar la consulta para URL
    const consultaCodeada = encodeURIComponent(consulta);
    
    // Construir URL completa
    const url = `${API_BASE_URL}?query=${consultaCodeada}&format=${formato}`;
    
    // Realizar la solicitud
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
      throw new Error(`Error de API Exoplanetas: ${respuesta.status} ${respuesta.statusText}`);
    }
    
    // Analizar respuesta según el formato solicitado
    if (formato === 'json') {
      return await respuesta.json();
    } else {
      return await respuesta.text();
    }
  } catch (error) {
    console.error('Error en consulta de exoplanetas:', error);
    throw error;
  }
}

/**
 * Obtiene exoplanetas según filtros específicos
 * @param {Object} filtros - Objeto con los filtros a aplicar
 * @param {Object} ordenamiento - Campo y dirección para ordenar resultados
 * @param {number} limite - Número máximo de resultados a devolver
 * @returns {Promise} - Promesa con los resultados filtrados
 */
export async function consultarExoplanetasPorFiltros(filtros, ordenamiento = { campo: 'pl_name', direccion: 'ASC' }, limite = 100) {
  // Iniciar construcción de consulta
  let consulta = "SELECT pl_name, hostname, pl_orbper, pl_rade, pl_bmasse, pl_bmassj, pl_radj, pl_eqt, st_dist, pl_disc, pl_discmethod, pl_facility, rowupdate FROM ps WHERE 1=1";
  
  // Añadir filtros de nombre (búsqueda con LIKE)
  if (filtros.pl_name) {
    consulta += ` AND pl_name LIKE '%${filtros.pl_name}%'`;
  }
  
  if (filtros.hostname) {
    consulta += ` AND hostname LIKE '%${filtros.hostname}%'`;
  }
  
  // Añadir filtros numéricos con rangos
  if (filtros.pl_rade_min) {
    consulta += ` AND pl_rade >= ${filtros.pl_rade_min}`;
  }
  
  if (filtros.pl_rade_max) {
    consulta += ` AND pl_rade <= ${filtros.pl_rade_max}`;
  }
  
  if (filtros.pl_eqt_min) {
    consulta += ` AND pl_eqt >= ${filtros.pl_eqt_min}`;
  }
  
  if (filtros.pl_eqt_max) {
    consulta += ` AND pl_eqt <= ${filtros.pl_eqt_max}`;
  }
  
  if (filtros.st_dist_max) {
    consulta += ` AND st_dist <= ${filtros.st_dist_max}`;
  }
  
  if (filtros.pl_disc) {
    consulta += ` AND pl_disc = ${filtros.pl_disc}`;
  }
  
  if (filtros.pl_discmethod) {
    consulta += ` AND pl_discmethod = '${filtros.pl_discmethod}'`;
  }
  
  // Añadir cláusula ORDER BY
  consulta += ` ORDER BY ${ordenamiento.campo} ${ordenamiento.direccion}`;
  
  // Ejecutar consulta
  return await consultarExoplanetas(consulta, limite);
}

/**
 * Obtiene detalles completos de un exoplaneta específico por su nombre
 * @param {string} nombrePlaneta - Nombre exacto del exoplaneta
 * @returns {Promise} - Promesa con los detalles del exoplaneta
 */
export async function obtenerDetallesExoplaneta(nombrePlaneta) {
  const consulta = `
    SELECT * FROM ps 
    WHERE pl_name = '${nombrePlaneta}'
  `;
  
  const resultados = await consultarExoplanetas(consulta, 1);
  
  if (resultados.length === 0) {
    throw new Error(`No se encontró el exoplaneta ${nombrePlaneta}`);
  }
  
  return resultados[0];
}

/**
 * Obtiene estadísticas generales sobre exoplanetas
 * @returns {Promise} - Promesa con estadísticas
 */
export async function consultarEstadisticasExoplanetas() {
  try {
    // Consulta para obtener el total de planetas
    const totalPlanetas = await consultarExoplanetas(
      "SELECT COUNT(*) as count FROM ps", 
      1
    );
    
    // Consulta para obtener el total de sistemas estelares únicos
    const totalSistemas = await consultarExoplanetas(
      "SELECT COUNT(DISTINCT hostname) as count FROM ps", 
      1
    );
    
    // Consulta para obtener el total de planetas potencialmente habitables
    const potencialmenteHabitables = await consultarExoplanetas(
      "SELECT COUNT(*) as count FROM ps WHERE pl_eqt BETWEEN 180 AND 310 AND pl_rade < 2", 
      1
    );
    
    // Consulta para obtener el año más reciente de descubrimiento
    const ultimoDescubrimiento = await consultarExoplanetas(
      "SELECT MAX(pl_disc) as max_year FROM ps", 
      1
    );
    
    // Retornar todas las estadísticas combinadas
    return {
      totalPlanetas: totalPlanetas[0].count,
      totalSistemas: totalSistemas[0].count,
      potencialmenteHabitables: potencialmenteHabitables[0].count,
      ultimoDescubrimiento: ultimoDescubrimiento[0].max_year
    };
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
}