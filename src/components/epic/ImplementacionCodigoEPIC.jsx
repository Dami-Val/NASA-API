import React from 'react';

function ImplementacionCodigoEPIC() {
  return (
    <section className="code-section">
      <h2>Código de Implementación EPIC</h2>
      <p>Aquí está el código JavaScript utilizado para interactuar con la API EPIC en esta demostración:</p>
      <pre>
{`const API_KEY = 'Puedes usar tu propia clave API de NASA aquí';
const API_BASE_URL = 'https://api.nasa.gov/EPIC/api';
const ARCHIVE_BASE_URL = 'https://api.nasa.gov/EPIC/archive';

// Función para obtener imágenes recientes
async function obtenerImagenesRecientes(coleccion = 'natural') {
    try {
        const url = \`\${API_BASE_URL}/\${coleccion}?api_key=\${API_KEY}\`;
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            throw new Error(\`Error de API NASA: \${respuesta.status} \${respuesta.statusText}\`);
        }
        
        const datos = await respuesta.json();
        return agregarURLsImagen(datos, coleccion);
    } catch (error) {
        console.error('Error al obtener imágenes recientes:', error);
        throw error;
    }
}

// Función para obtener imágenes por fecha
async function obtenerImagenesPorFecha(fecha, coleccion = 'natural') {
    try {
        const url = \`\${API_BASE_URL}/\${coleccion}/date/\${fecha}?api_key=\${API_KEY}\`;
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            throw new Error(\`Error de API NASA: \${respuesta.status} \${respuesta.statusText}\`);
        }
        
        const datos = await respuesta.json();
        return agregarURLsImagen(datos, coleccion);
    } catch (error) {
        console.error(\`Error al obtener imágenes para la fecha \${fecha}:\`, error);
        throw error;
    }
}

// Función para obtener todas las fechas disponibles
async function obtenerFechasDisponibles(coleccion = 'natural') {
    try {
        const url = \`\${API_BASE_URL}/\${coleccion}/all?api_key=\${API_KEY}\`;
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            throw new Error(\`Error de API NASA: \${respuesta.status} \${respuesta.statusText}\`);
        }
        
        const datos = await respuesta.json();
        
        // Extraer fechas únicas y ordenarlas
        const fechas = [...new Set(datos.map(item => item.date.substring(0, 10)))];
        fechas.sort((a, b) => new Date(b) - new Date(a));
        
        return fechas;
    } catch (error) {
        console.error('Error al obtener fechas disponibles:', error);
        throw error;
    }
}

// Función auxiliar para agregar URLs de imagen a los metadatos
function agregarURLsImagen(imagenes, coleccion) {
    return imagenes.map(imagen => {
        // Extraer componentes de fecha de la fecha de la imagen
        const fechaImagen = new Date(imagen.date);
        const anio = fechaImagen.getUTCFullYear();
        const mes = String(fechaImagen.getUTCMonth() + 1).padStart(2, '0');
        const dia = String(fechaImagen.getUTCDate()).padStart(2, '0');
        
        // Construir URL de la imagen
        const urlImagen = \`\${ARCHIVE_BASE_URL}/\${coleccion}/\${anio}/\${mes}/\${dia}/png/\${imagen.image}.png?api_key=\${API_KEY}\`;
        
        return {
            ...imagen,
            url_imagen: urlImagen
        };
    });
}

// Ejemplo: Obtener imágenes más recientes
obtenerImagenesRecientes('natural')
    .then(imagenes => {
        console.log('Imágenes recientes:', imagenes);
        mostrarImagenes(imagenes);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Ejemplo: Obtener imágenes para una fecha específica
obtenerImagenesPorFecha('2023-01-01', 'enhanced')
    .then(imagenes => {
        console.log('Imágenes del 1 de enero de 2023:', imagenes);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Ejemplo: Obtener fechas disponibles
obtenerFechasDisponibles('natural')
    .then(fechas => {
        console.log('Fechas disponibles:', fechas);
    })
    .catch(error => {
        console.error('Error:', error);
    });`}
      </pre>
    </section>
  );
}

export default ImplementacionCodigoEPIC;