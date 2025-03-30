import React from 'react';

function InformacionNEOAPI() {
  return (
    <section className="api-section">
      <h2>Acerca de la API de Objetos Cercanos a la Tierra (NEO)</h2>
      <p>La API de Objetos Cercanos a la Tierra (Near Earth Objects - NEO) proporciona acceso a datos de asteroides cercanos a la Tierra catalogados por NASA. Esta API le permite obtener información sobre asteroides que pasan cerca de nuestro planeta.</p>
      <p>El servicio NeoWs (Near Earth Object Web Service) es un servicio web RESTful que proporciona información sobre asteroides cercanos a la Tierra y sus aproximaciones a nuestro planeta.</p>
      
      <h3>Puntos de Acceso de la API</h3>
      <p>La API NeoWs proporciona varios endpoints para diferentes tipos de consultas:</p>
      
      <table>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>GET https://api.nasa.gov/neo/rest/v1/feed</code></td>
            <td>Obtener lista de asteroides cercanos a la Tierra en un rango de fechas</td>
          </tr>
          <tr>
            <td><code>GET https://api.nasa.gov/neo/rest/v1/neo/{asteroid_id}</code></td>
            <td>Buscar un asteroide específico por su ID de NASA</td>
          </tr>
          <tr>
            <td><code>GET https://api.nasa.gov/neo/rest/v1/neo/browse</code></td>
            <td>Explorar los asteroides cercanos a la Tierra disponibles</td>
          </tr>
          <tr>
            <td><code>GET https://api.nasa.gov/neo/rest/v1/stats</code></td>
            <td>Obtener estadísticas generales sobre NEOs</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Parámetros para el Endpoint Feed</h3>
      <p>El endpoint <code>/feed</code> es uno de los más útiles, permitiendo buscar NEOs en un rango de fechas:</p>
      <table>
        <thead>
          <tr>
            <th>Parámetro</th>
            <th>Tipo</th>
            <th>Predeterminado</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>start_date</td>
            <td>AAAA-MM-DD</td>
            <td>Hoy</td>
            <td>Inicio del rango de fechas para la consulta (7 días máximo)</td>
          </tr>
          <tr>
            <td>end_date</td>
            <td>AAAA-MM-DD</td>
            <td>+7 días desde start_date</td>
            <td>Fin del rango de fechas para la consulta</td>
          </tr>
          <tr>
            <td>api_key</td>
            <td>cadena</td>
            <td>DEMO_KEY</td>
            <td>Tu clave de API de NASA</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Ejemplos de Respuesta de la API</h3>
      <p>La API devuelve datos detallados sobre cada NEO, incluyendo:</p>
      <ul>
        <li><strong>ID</strong> - Identificador único del asteroide</li>
        <li><strong>Nombre</strong> - Designación oficial del asteroide</li>
        <li><strong>Diámetro estimado</strong> - Tamaño aproximado en kilómetros</li>
        <li><strong>Potencialmente peligroso</strong> - Indicador de si es clasificado como potencialmente peligroso</li>
        <li><strong>Datos de aproximación</strong> - Fechas, distancias, y velocidades de aproximaciones a la Tierra</li>
        <li><strong>Enlaces</strong> - URLs a páginas con más información detallada</li>
      </ul>
      
      <h3>Ejemplos de Solicitud</h3>
      <pre>https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-01-01&end_date=2023-01-07&api_key=TU_CLAVE_API</pre>
      <pre>https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=TU_CLAVE_API</pre>
      <pre>https://api.nasa.gov/neo/rest/v1/stats?api_key=TU_CLAVE_API</pre>
      
      <h3>Límites de Uso</h3>
      <p>Como otras APIs de NASA, los límites estándar son:</p>
      <ul>
        <li>Límite por Hora: 1,000 solicitudes por hora</li>
        <li>Límite Diario: 50,000 solicitudes por día</li>
      </ul>
      <p>Con la DEMO_KEY, los límites son más restrictivos (30 solicitudes por hora, 50 por día).</p>
    </section>
  );
}

export default InformacionNEOAPI;
