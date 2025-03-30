import React from 'react';

function ImplementacionCodigo() {
  return (
    <section className="code-section">
      <h2>Código de Implementación APOD</h2>
      <p>Aquí está el código JavaScript utilizado para interactuar con la API APOD en esta demostración:</p>
      <pre>
{`const API_KEY = 'bAAnDfis8xgDe7SqToTxqQKD3sWVTgMQLqJexjS0';
const API_URL = 'https://api.nasa.gov/planetary/apod';

async function obtenerAPOD(params = {}) {
    // Añadir clave API a los parámetros
    params.api_key = API_KEY;
    
    // Convertir objeto de parámetros a cadena de consulta URL
    const cadenaConsulta = Object.keys(params)
        .map(key => \`\${encodeURIComponent(key)}=\${encodeURIComponent(params[key])}\`)
        .join('&');
    
    // Realizar solicitud a la API
    const respuesta = await fetch(\`\${API_URL}?\${cadenaConsulta}\`);
    
    // Verificar si la solicitud fue exitosa
    if (!respuesta.ok) {
        throw new Error(\`Error de API NASA: \${respuesta.status} \${respuesta.statusText}\`);
    }
    
    // Analizar y devolver la respuesta JSON
    return await respuesta.json();
}

// Ejemplo: Obtener APOD de hoy
obtenerAPOD()
    .then(datos => {
        console.log('APOD de hoy:', datos);
        mostrarAPOD(datos);
    })
    .catch(error => {
        console.error('Error al obtener APOD:', error);
    });

// Ejemplo: Obtener APOD para una fecha específica
obtenerAPOD({ date: '2022-01-01' })
    .then(datos => {
        console.log('APOD para 2022-01-01:', datos);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Ejemplo: Obtener 5 APODs aleatorios
obtenerAPOD({ count: 5 })
    .then(datos => {
        console.log('5 APODs aleatorios:', datos);
    })
    .catch(error => {
        console.error('Error:', error);
    });`}
      </pre>
    </section>
  );
}

export default ImplementacionCodigo;