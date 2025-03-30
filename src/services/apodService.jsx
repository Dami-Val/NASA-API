const API_KEY = 'bAAnDfis8xgDe7SqToTxqQKD3sWVTgMQLqJexjS0';
const API_URL = 'https://api.nasa.gov/planetary/apod';

export async function obtenerAPOD(params = {}) {
  // Añadir clave API a los parámetros
  params.api_key = API_KEY;
  
  // Convertir objeto de parámetros a cadena de consulta URL
  const cadenaConsulta = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  
  // Realizar solicitud a la API
  const respuesta = await fetch(`${API_URL}?${cadenaConsulta}`);
  
  // Verificar si la solicitud fue exitosa
  if (!respuesta.ok) {
    throw new Error(`Error de API NASA: ${respuesta.status} ${respuesta.statusText}`);
  }
  
  // Analizar y devolver la respuesta JSON
  return await respuesta.json();
}

export const API_KEY_VALUE = API_KEY;