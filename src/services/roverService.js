const API_KEY = 'bAAnDfis8xgDe7SqToTxqQKD3sWVTgMQLqJexjS0';
const API_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers';

export async function obtenerFotosRover(rover, params = {}) {
  // Añadir clave API a los parámetros
  params.api_key = API_KEY;
  
  // Construir URL base según el tipo de consulta
  let url = `${API_URL}/${rover}/photos`;
  
  // Convertir objeto de parámetros a cadena de consulta URL
  const cadenaConsulta = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  
  // Realizar solicitud a la API
  const respuesta = await fetch(`${url}?${cadenaConsulta}`);
  
  // Verificar si la solicitud fue exitosa
  if (!respuesta.ok) {
    throw new Error(`Error de API NASA: ${respuesta.status} ${respuesta.statusText}`);
  }
  
  // Analizar y devolver la respuesta JSON
  const datos = await respuesta.json();
  return datos.photos || [];
}

export async function obtenerManifiestoRover(rover) {
  try {
    const respuesta = await fetch(`${API_URL}/${rover}/latest_photos?api_key=${API_KEY}`);
    
    if (!respuesta.ok) {
      throw new Error(`Error de API NASA: ${respuesta.status} ${respuesta.statusText}`);
    }
    
    const datos = await respuesta.json();
    
    // Obtener información del rover desde la primera foto
    if (datos.latest_photos && datos.latest_photos.length > 0) {
      return datos.latest_photos[0].rover;
    }
    
    return null;
  } catch (error) {
    console.error('Error al obtener manifiesto:', error);
    throw error;
  }
}

// Configuración de cámaras disponibles para cada rover
export const camarasPorRover = {
  curiosity: [
    { id: 'FHAZ', nombre: 'Front Hazard Avoidance Camera' },
    { id: 'RHAZ', nombre: 'Rear Hazard Avoidance Camera' },
    { id: 'MAST', nombre: 'Mast Camera' },
    { id: 'CHEMCAM', nombre: 'Chemistry and Camera Complex' },
    { id: 'MAHLI', nombre: 'Mars Hand Lens Imager' },
    { id: 'MARDI', nombre: 'Mars Descent Imager' },
    { id: 'NAVCAM', nombre: 'Navigation Camera' }
  ],
  opportunity: [
    { id: 'FHAZ', nombre: 'Front Hazard Avoidance Camera' },
    { id: 'RHAZ', nombre: 'Rear Hazard Avoidance Camera' },
    { id: 'NAVCAM', nombre: 'Navigation Camera' },
    { id: 'PANCAM', nombre: 'Panoramic Camera' },
    { id: 'MINITES', nombre: 'Miniature Thermal Emission Spectrometer' }
  ],
  spirit: [
    { id: 'FHAZ', nombre: 'Front Hazard Avoidance Camera' },
    { id: 'RHAZ', nombre: 'Rear Hazard Avoidance Camera' },
    { id: 'NAVCAM', nombre: 'Navigation Camera' },
    { id: 'PANCAM', nombre: 'Panoramic Camera' },
    { id: 'MINITES', nombre: 'Miniature Thermal Emission Spectrometer' }
  ]
};

export const API_KEY_VALUE = API_KEY;