import React from 'react';

function InformacionRoverAPI() {
  return (
    <section className="api-section">
      <h2>Acerca de la API Mars Rover Photos</h2>
      <p>Esta API está diseñada para recopilar datos de imágenes tomadas por los rovers Curiosity, Opportunity y Spirit de la NASA en Marte y ponerlos a disposición de desarrolladores, educadores y científicos ciudadanos.</p>
      <p>Cada rover tiene su propio conjunto de fotos almacenadas en la base de datos, que se pueden consultar por separado. Las fotos están organizadas por el sol (rotación o día marciano) en que fueron tomadas, contando desde la fecha de aterrizaje del rover.</p>
      
      <h3>Punto de Acceso de la API</h3>
      <code>GET https://api.nasa.gov/mars-photos/api/v1/rovers/[ROVER]/photos</code>
      
      <h3>Rovers Disponibles</h3>
      <ul>
        <li><strong>Curiosity</strong> - Lanzado el 26 de noviembre de 2011</li>
        <li><strong>Opportunity</strong> - Lanzado el 7 de julio de 2003</li>
        <li><strong>Spirit</strong> - Lanzado el 10 de junio de 2003</li>
      </ul>
      
      <h3>Cámaras de los Rovers</h3>
      <table>
        <thead>
          <tr>
            <th>Abreviatura</th>
            <th>Cámara</th>
            <th>Curiosity</th>
            <th>Opportunity</th>
            <th>Spirit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FHAZ</td>
            <td>Front Hazard Avoidance Camera</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>RHAZ</td>
            <td>Rear Hazard Avoidance Camera</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>MAST</td>
            <td>Mast Camera</td>
            <td>✓</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>CHEMCAM</td>
            <td>Chemistry and Camera Complex</td>
            <td>✓</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>MAHLI</td>
            <td>Mars Hand Lens Imager</td>
            <td>✓</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>MARDI</td>
            <td>Mars Descent Imager</td>
            <td>✓</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>NAVCAM</td>
            <td>Navigation Camera</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>PANCAM</td>
            <td>Panoramic Camera</td>
            <td></td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>MINITES</td>
            <td>Miniature Thermal Emission Spectrometer (Mini-TES)</td>
            <td></td>
            <td>✓</td>
            <td>✓</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Parámetros para Consulta por Sol Marciano</h3>
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
            <td>sol</td>
            <td>entero</td>
            <td>ninguno</td>
            <td>Sol (rango de 0 al máximo encontrado en el endpoint)</td>
          </tr>
          <tr>
            <td>camera</td>
            <td>cadena</td>
            <td>todas</td>
            <td>Abreviatura de la cámara (ver tabla anterior)</td>
          </tr>
          <tr>
            <td>page</td>
            <td>entero</td>
            <td>1</td>
            <td>25 elementos por página devueltos</td>
          </tr>
          <tr>
            <td>api_key</td>
            <td>cadena</td>
            <td>DEMO_KEY</td>
            <td>Clave api.nasa.gov para uso ampliado</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Ejemplos de Consultas por Sol</h3>
      <pre>https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=TU_CLAVE_API</pre>
      <pre>https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=TU_CLAVE_API</pre>
      <pre>https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=TU_CLAVE_API</pre>
      
      <h3>Parámetros para Consulta por Fecha Terrestre</h3>
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
            <td>earth_date</td>
            <td>AAAA-MM-DD</td>
            <td>ninguno</td>
            <td>Fecha correspondiente en la Tierra para el sol dado</td>
          </tr>
          <tr>
            <td>camera</td>
            <td>cadena</td>
            <td>todas</td>
            <td>Abreviatura de la cámara (ver tabla anterior)</td>
          </tr>
          <tr>
            <td>page</td>
            <td>entero</td>
            <td>1</td>
            <td>25 elementos por página devueltos</td>
          </tr>
          <tr>
            <td>api_key</td>
            <td>cadena</td>
            <td>DEMO_KEY</td>
            <td>Clave api.nasa.gov para uso ampliado</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Ejemplo de Consulta por Fecha Terrestre</h3>
      <pre>https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=TU_CLAVE_API</pre>
      
      <h3>Manifiesto de Misión</h3>
      <p>Un manifiesto de misión está disponible para cada Rover en <code>/manifests/nombre_rover</code>. Este manifiesto enumera los detalles de la misión del Rover para ayudar a acotar las consultas de fotos a la API.</p>
      <p>La información del manifiesto incluye:</p>
      <ul>
        <li><strong>name</strong> - Nombre del Rover</li>
        <li><strong>landing_date</strong> - Fecha de aterrizaje del Rover en Marte</li>
        <li><strong>launch_date</strong> - Fecha de lanzamiento del Rover desde la Tierra</li>
        <li><strong>status</strong> - Estado de la misión del Rover</li>
        <li><strong>max_sol</strong> - El sol marciano más reciente del que existen fotos</li>
        <li><strong>max_date</strong> - La fecha terrestre más reciente de la que existen fotos</li>
        <li><strong>total_photos</strong> - Número de fotos tomadas por ese Rover</li>
      </ul>
    </section>
  );
}

export default InformacionRoverAPI;