import React from 'react';

function ImplementacionCodigoRover() {
  return (
    <section className="code-section">
      <h2>Código de Implementación Mars Rover Photos</h2>
      <p>Aquí está el código JavaScript utilizado para interactuar con la API Mars Rover Photos en esta demostración:</p>
      <pre>
{`const API_KEY = 'bAAnDfis8xgDe7SqToTxqQKD3sWVTgMQLqJexjS0';
const API_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers';

async function obtenerFotosRover(rover, params = {}) {
    // Añadir clave API a los parámetros
    params.api_key = API_KEY;
    
    // Construir URL base
    let url = \`\${API_URL}/\${rover}/photos\`;
    
    // Convertir objeto de parámetros a cadena de consulta URL
    const cadenaConsulta = Object.keys(params)
        .map(key => \`\${encodeURIComponent(key)}=\${encodeURIComponent(params[key])}\`)
        .join('&');
    
    // Realizar solicitud a la API
    const respuesta = await fetch(\`\${url}?\${cadenaConsulta}\`);
    
    // Verificar si la solicitud fue exitosa
    if (!respuesta.ok) {
        throw new Error(\`Error de API NASA: \${respuesta.status} \${respuesta.statusText}\`);
    }
    
    // Analizar y devolver la respuesta JSON
    const datos = await respuesta.json();
    return datos.photos || [];
}

// Ejemplo: Obtener fotos de Curiosity en sol 1000
obtenerFotosRover('curiosity', { sol: 1000 })
    .then(fotos => {
        console.log('Fotos de Curiosity en sol 1000:', fotos);
        mostrarFotos(fotos);
    })
    .catch(error => {
        console.error('Error al obtener fotos:', error);
    });

// Ejemplo: Obtener fotos de Opportunity de una fecha específica
obtenerFotosRover('opportunity', { earth_date: '2015-06-03' })
    .then(fotos => {
        console.log('Fotos de Opportunity del 3 de junio de 2015:', fotos);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Ejemplo: Obtener fotos de Spirit con una cámara específica
obtenerFotosRover('spirit', { sol: 1000, camera: 'pancam' })
    .then(fotos => {
        console.log('Fotos de Spirit con PANCAM en sol 1000:', fotos);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Ejemplo: Obtener manifiesto de misión para un rover
async function obtenerManifiestoRover(rover) {
    try {
        const respuesta = await fetch(\`\${API_URL}/\${rover}/latest_photos?api_key=\${API_KEY}\`);
        
        if (!respuesta.ok) {
            throw new Error(\`Error de API NASA: \${respuesta.status} \${respuesta.statusText}\`);
        }
        
        const datos = await respuesta.json();
        
        // Obtener información del rover desde la primera foto
        if (datos.latest_photos && datos.latest_photos.length > 0) {
            return datos.latest_photos[0].rover;
        }
        
        return null;
    } catch (error) {
        console.error('Error al obtener manifiesto:', error);
        return null;
    }
}`}
      </pre>
    </section>
  );
}

export default ImplementacionCodigoRover;