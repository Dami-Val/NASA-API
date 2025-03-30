const API_KEY = 'bAAnDfis8xgDe7SqToTxqQKD3sWVTgMQLqJexjS0';
const API_BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

/**
 * Obtiene asteroides cercanos a la Tierra en un rango de fechas
 * @param {string} fechaInicio - Fecha de inicio en formato AAAA-MM-DD
 * @param {string} fechaFin - Fecha final en formato AAAA-MM-DD (máximo 7 días después de la fecha inicial)
 * @returns {Promise} - Promesa con datos de NEOs
 */
export async function obtenerNEOEnRango(fechaInicio, fechaFin) {
  try {
    const url = `${API_BASE_URL}/feed?start_date=${fechaInicio}&end_date=${fechaFin}&api_key=${API_KEY}`;
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
      throw new Error(`Error de API NASA: ${respuesta.status} ${respuesta.statusText}`);
    }
    
    return await respuesta.json();
  } catch (error) {
    console.error('Error al obtener datos de NEO por rango:', error);
    throw error;
  }
}

/**
 * Obtiene información detallada sobre un asteroide específico por su ID
 * @param {string} id - ID del asteroide
 * @returns {Promise} - Promesa con datos detallados del asteroide
 */
export async function obtenerNEOPorId(id) {
  try {
    const url = `${API_BASE_URL}/neo/${id}?api_key=${API_KEY}`;
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
      throw new Error(`Error de API NASA: ${respuesta.status} ${respuesta.statusText}`);
    }
    
    return await respuesta.json();
  } catch (error) {
    console.error('Error al obtener datos de NEO por ID:', error);
    throw error;
  }
}

/**
 * Navega por los asteroides disponibles
 * @param {number} pagina - Número de página
 * @returns {Promise} - Promesa con lista de asteroides
 */
export async function navegarAsteroides(pagina = 0) {
  try {
    const url = `${API_BASE_URL}/neo/browse?page=${pagina}&api_key=${API_KEY}`;
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
      throw new Error(`Error de API NASA: ${respuesta.status} ${respuesta.statusText}`);
    }
    
    return await respuesta.json();
  } catch (error) {
    console.error('Error al navegar asteroides:', error);
    throw error;
  }
}

/**
 * Obtiene estadísticas generales sobre NEOs
 * @returns {Promise} - Promesa con datos estadísticos
 */
export async function obtenerEstadisticasNEO() {
  try {
    const url = `${API_BASE_URL}/stats?api_key=${API_KEY}`;
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
      throw new Error(`Error de API NASA: ${respuesta.status} ${respuesta.statusText}`);
    }
    
    return await respuesta.json();
  } catch (error) {
    console.error('Error al obtener estadísticas de NEO:', error);
    throw error;
  }
}

export const API_KEY_VALUE = API_KEY;