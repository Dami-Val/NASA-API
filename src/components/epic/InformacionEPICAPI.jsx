import React from 'react';

function InformacionEPICAPI() {
  return (
    <section className="api-section">
      <h2>Acerca de la API EPIC (Earth Polychromatic Imaging Camera)</h2>
      <p>La API EPIC proporciona acceso a imágenes diarias de la Tierra completa tomadas por la cámara EPIC (Earth Polychromatic Imaging Camera) a bordo del satélite DSCOVR.</p>
      <p>DSCOVR está ubicado en el punto Lagrangiano L1, aproximadamente a 1.5 millones de kilómetros de la Tierra, lo que permite a EPIC capturar una vista única de la Tierra totalmente iluminada a diario.</p>
      
      <h3>Puntos de Acceso de la API</h3>
      <p>La API EPIC proporciona acceso a diferentes tipos de imágenes:</p>
      <ul>
        <li><strong>Imágenes Naturales</strong>: Imágenes de color visible que se asemejan a lo que vería el ojo humano.</li>
        <li><strong>Imágenes Mejoradas</strong>: Imágenes que han sido procesadas para mejorar características específicas.</li>
      </ul>
      
      <h3>Endpoints Principales</h3>
      <table>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>GET https://api.nasa.gov/EPIC/api/natural</code></td>
            <td>Obtener la lista más reciente de imágenes naturales disponibles</td>
          </tr>
          <tr>
            <td><code>GET https://api.nasa.gov/EPIC/api/natural/date/{'{'}date{'}'}</code></td>
            <td>Obtener imágenes naturales para una fecha específica (formato AAAA-MM-DD)</td>
          </tr>
          <tr>
            <td><code>GET https://api.nasa.gov/EPIC/api/natural/all</code></td>
            <td>Obtener todas las fechas que tienen imágenes naturales disponibles</td>
          </tr>
          <tr>
            <td><code>GET https://api.nasa.gov/EPIC/api/enhanced</code></td>
            <td>Obtener la lista más reciente de imágenes mejoradas disponibles</td>
          </tr>
          <tr>
            <td><code>GET https://api.nasa.gov/EPIC/api/enhanced/date/{'{'}date{'}'}</code></td>
            <td>Obtener imágenes mejoradas para una fecha específica</td>
          </tr>
          <tr>
            <td><code>GET https://api.nasa.gov/EPIC/api/enhanced/all</code></td>
            <td>Obtener todas las fechas que tienen imágenes mejoradas disponibles</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Acceso a las Imágenes</h3>
      <p>El endpoint de la API proporciona metadatos sobre las imágenes, pero las imágenes en sí se acceden a través de un endpoint diferente. La URL para obtener la imagen real sigue este formato:</p>
      <pre>https://api.nasa.gov/EPIC/archive/{'{'}collection{'}'}/{'{'}year{'}'}/{'{'}month{'}'}/{'{'}day{'}'}/png/{'{'}image{'}'}.png?api_key=TU_CLAVE_API</pre>
      <p>Donde:</p>
      <ul>
        <li><strong>{'{'}collection{'}'}</strong>: "natural" o "enhanced"</li>
        <li><strong>{'{'}year{'}'}</strong>: Año en formato AAAA</li>
        <li><strong>{'{'}month{'}'}</strong>: Mes en formato MM (con ceros a la izquierda)</li>
        <li><strong>{'{'}day{'}'}</strong>: Día en formato DD (con ceros a la izquierda)</li>
        <li><strong>{'{'}image{'}'}</strong>: El nombre de la imagen (obtenido del campo "image" en la respuesta de la API)</li>
      </ul>
      
      <h3>Metadatos de la Imagen</h3>
      <p>Cada imagen viene con un conjunto de metadatos que proporcionan información valiosa:</p>
      <ul>
        <li><strong>identifier</strong>: Identificador único de la imagen</li>
        <li><strong>caption</strong>: Descripción de la imagen</li>
        <li><strong>image</strong>: Nombre del archivo de la imagen</li>
        <li><strong>version</strong>: Versión del procesamiento ("natural" o "enhanced")</li>
        <li><strong>date</strong>: Fecha y hora en que se tomó la imagen</li>
        <li><strong>centroid_coordinates</strong>: Coordenadas del centro de la Tierra en la imagen</li>
        <li><strong>dscovr_j2000_position</strong>: Posición del satélite DSCOVR en el momento de la imagen</li>
        <li><strong>lunar_j2000_position</strong>: Posición de la Luna en el momento de la imagen</li>
        <li><strong>sun_j2000_position</strong>: Posición del Sol en el momento de la imagen</li>
        <li><strong>attitude_quaternions</strong>: Cuaterniones de actitud de la nave espacial</li>
      </ul>
      
      <h3>Parámetros de Solicitud</h3>
      <table>
        <thead>
          <tr>
            <th>Parámetro</th>
            <th>Tipo</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>api_key</td>
            <td>cadena</td>
            <td>Tu clave de API de NASA</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Ejemplos de Solicitudes</h3>
      <pre>https://api.nasa.gov/EPIC/api/natural?api_key=TU_CLAVE_API</pre>
      <pre>https://api.nasa.gov/EPIC/api/natural/date/2023-01-01?api_key=TU_CLAVE_API</pre>
      <pre>https://api.nasa.gov/EPIC/archive/natural/2023/01/01/png/epic_1b_20230101001751.png?api_key=TU_CLAVE_API</pre>
      
      <h3>Límites de Uso</h3>
      <p>Al igual que otras APIs de NASA, los límites estándar son:</p>
      <ul>
        <li>Límite por Hora: 1,000 solicitudes por hora</li>
        <li>Límite Diario: 50,000 solicitudes por día</li>
      </ul>
      <p>Con la DEMO_KEY, los límites son más restrictivos (30 solicitudes por hora, 50 por día).</p>
    </section>
  );
}

export default InformacionEPICAPI;