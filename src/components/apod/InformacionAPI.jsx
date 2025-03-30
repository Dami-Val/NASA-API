import React from 'react';

function InformacionAPI() {
  return (
    <section className="api-section">
      <h2>Acerca de la API APOD</h2>
      <p>La Imagen Astronómica del Día (APOD) es uno de los servicios más populares de la NASA. Cada día, se presenta una imagen o fotografía diferente de nuestro universo, junto con una breve explicación escrita por un astrónomo profesional.</p>
      <p>Esta página web demuestra cómo utilizar la API APOD para acceder programáticamente a este tesoro de imágenes astronómicas.</p>
      
      <h3>Punto de Acceso de la API</h3>
      <code>GET https://api.nasa.gov/planetary/apod</code>
      
      <h3>Parámetros de la API</h3>
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
            <td>date</td>
            <td>AAAA-MM-DD</td>
            <td>hoy</td>
            <td>La fecha de la imagen APOD a recuperar</td>
          </tr>
          <tr>
            <td>start_date</td>
            <td>AAAA-MM-DD</td>
            <td>ninguno</td>
            <td>El inicio de un rango de fechas, cuando se solicitan fechas para un rango. No se puede usar con <code>date</code>.</td>
          </tr>
          <tr>
            <td>end_date</td>
            <td>AAAA-MM-DD</td>
            <td>hoy</td>
            <td>El final del rango de fechas, cuando se usa con <code>start_date</code>.</td>
          </tr>
          <tr>
            <td>count</td>
            <td>entero</td>
            <td>ninguno</td>
            <td>Si se especifica, se devolverán <code>count</code> imágenes elegidas aleatoriamente. No se puede usar con <code>date</code> o <code>start_date</code> y <code>end_date</code>.</td>
          </tr>
          <tr>
            <td>thumbs</td>
            <td>booleano</td>
            <td>Falso</td>
            <td>Devuelve la URL de la miniatura del video. Si un APOD no es un video, este parámetro se ignora.</td>
          </tr>
          <tr>
            <td>api_key</td>
            <td>cadena</td>
            <td>DEMO_KEY</td>
            <td>Tu clave de api.nasa.gov para uso ampliado</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Ejemplo de Solicitud a la API</h3>
      <pre>https://api.nasa.gov/planetary/apod?api_key=TU_CLAVE_API</pre>
      
      <h3>Formato de Respuesta de la API</h3>
      <p>La API devuelve un objeto JSON que contiene detalles sobre la imagen astronómica, incluyendo:</p>
      <ul>
        <li><strong>date</strong> - La fecha de la imagen APOD</li>
        <li><strong>explanation</strong> - La explicación de la imagen proporcionada por la NASA</li>
        <li><strong>hdurl</strong> - La URL de la imagen en alta definición</li>
        <li><strong>media_type</strong> - El tipo de medio (imagen o video)</li>
        <li><strong>service_version</strong> - La versión del servicio</li>
        <li><strong>title</strong> - El título de la imagen</li>
        <li><strong>url</strong> - La URL de la imagen o video APOD</li>
        <li><strong>copyright</strong> - El propietario del copyright de la imagen (si no está en el dominio público)</li>
      </ul>
      
      <h3>Límites de Uso</h3>
      <p>Con tu clave de API, típicamente estás limitado a:</p>
      <ul>
        <li>Límite por Hora: 1,000 solicitudes por hora</li>
        <li>Límite Diario: 50,000 solicitudes por día</li>
      </ul>
      <p>La DEMO_KEY tiene límites más restrictivos (30 solicitudes por hora, 50 por día).</p>
    </section>
  );
}

export default InformacionAPI;