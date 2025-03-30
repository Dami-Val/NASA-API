const API_KEY = 'bAAnDfis8xgDe7SqToTxqQKD3sWVTgMQLqJexjS0';
const API_BASE_URL = 'https://api.nasa.gov/EPIC/api';
const ARCHIVE_BASE_URL = 'https://api.nasa.gov/EPIC/archive';

export async function obtenerImagenesRecientes(coleccion = 'natural') {
  try {
    const url = `${API_BASE_URL}/${coleccion}?api_key=${API_KEY}`;
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
      throw new Error(`Error de API NASA: ${respuesta.status} ${respuesta.statusText}`);
    }
    
    const datos = await respuesta.json();
    return agregarURLsImagen(datos, coleccion);
  } catch (error) {
    console.error('Error al obtener imágenes recientes:', error);
    throw error;
  }
}

export async function obtenerImagenesPorFecha(fecha, coleccion = 'natural') {
  try {
    const url = `${API_BASE_URL}/${coleccion}/date/${fecha}?api_key=${API_KEY}`;
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
      throw new Error(`Error de API NASA: ${respuesta.status} ${respuesta.statusText}`);
    }
    
    const datos = await respuesta.json();
    return agregarURLsImagen(datos, coleccion);
  } catch (error) {
    console.error(`Error al obtener imágenes para la fecha ${fecha}:`, error);
    throw error;
  }
}

export async function obtenerFechasDisponibles(coleccion = 'natural') {
  try {
    const url = `${API_BASE_URL}/${coleccion}/all?api_key=${API_KEY}`;
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
      throw new Error(`Error de API NASA: ${respuesta.status} ${respuesta.statusText}`);
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
    const urlImagen = `${ARCHIVE_BASE_URL}/${coleccion}/${anio}/${mes}/${dia}/png/${imagen.image}.png?api_key=${API_KEY}`;
    
    return {
      ...imagen,
      url_imagen: urlImagen
    };
  });
}

export const API_KEY_VALUE = API_KEY;
export const API_BASE_URL_VALUE = API_BASE_URL;
export const ARCHIVE_BASE_URL_VALUE = ARCHIVE_BASE_URL;