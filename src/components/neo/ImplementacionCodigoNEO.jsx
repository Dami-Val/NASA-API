import React from 'react';

function ImplementacionCodigoNEO() {
  return (
    <section className="code-section">
      <h2>Código de Implementación NEO</h2>
      <p>Aquí está el código JavaScript utilizado para interactuar con la API NeoWs (Near Earth Object Web Service) en esta demostración:</p>
      <pre>
{`const API_KEY = 'Puedes usar tu propia clave API de NASA aquí';
const API_BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

/**
 * Obtiene asteroides cercanos a la Tierra en un rango de fechas
 * @param {string} fechaInicio - Fecha de inicio en formato AAAA-MM-DD
 * @param {string} fechaFin - Fecha final en formato AAAA-MM-DD (máximo 7 días después de la fecha inicial)
 * @returns {Promise} - Promesa con datos de NEOs
 */
async function obtenerNEOEnRango(fechaInicio, fechaFin) {
    try {
        const url = \`\${API_BASE_URL}/feed?start_date=\${fechaInicio}&end_date=\${fechaFin}&api_key=\${API_KEY}\`;
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            throw new Error(\`Error de API NASA: \${respuesta.status} \${respuesta.statusText}\`);
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
async function obtenerNEOPorId(id) {
    try {
        const url = \`\${API_BASE_URL}/neo/\${id}?api_key=\${API_KEY}\`;
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            throw new Error(\`Error de API NASA: \${respuesta.status} \${respuesta.statusText}\`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener datos de NEO por ID:', error);
        throw error;
    }
}

/**
 * Obtiene estadísticas generales sobre NEOs
 * @returns {Promise} - Promesa con datos estadísticos
 */
async function obtenerEstadisticasNEO() {
    try {
        const url = \`\${API_BASE_URL}/stats?api_key=\${API_KEY}\`;
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            throw new Error(\`Error de API NASA: \${respuesta.status} \${respuesta.statusText}\`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener estadísticas de NEO:', error);
        throw error;
    }
}

// Ejemplo: Obtener NEOs para los próximos 7 días
obtenerNEOEnRango('2023-01-01', '2023-01-07')
    .then(datos => {
        console.log('NEOs encontrados:', datos.element_count);
        console.log('Datos por fecha:', datos.near_earth_objects);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Ejemplo: Obtener detalles de un asteroide específico
obtenerNEOPorId('3542519')
    .then(asteroide => {
        console.log('Nombre del asteroide:', asteroide.name);
        console.log('¿Es potencialmente peligroso?', asteroide.is_potentially_hazardous_asteroid ? 'Sí' : 'No');
        console.log('Diámetro estimado (km):', 
            asteroide.estimated_diameter.kilometers.estimated_diameter_min,
            '-',
            asteroide.estimated_diameter.kilometers.estimated_diameter_max
        );
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Ejemplo: Obtener estadísticas de NEO
obtenerEstadisticasNEO()
    .then(estadisticas => {
        console.log('Total de NEOs:', estadisticas.near_earth_object_count);
        console.log('Total de aproximaciones cercanas:', estadisticas.close_approach_count);
    })
    .catch(error => {
        console.error('Error:', error);
    });`}
      </pre>
    </section>
  );
}

export default ImplementacionCodigoNEO;