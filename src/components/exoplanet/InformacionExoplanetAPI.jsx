import React from 'react';

function InformacionExoplanetAPI() {
  return (
    <section className="api-section">
      <h2>Acerca de la API de Exoplanetas de NASA</h2>
      <p>La API de Exoplanetas proporciona acceso programático a la base de datos del Archivo de Exoplanetas de NASA, una de las colecciones más completas de datos sobre planetas fuera de nuestro sistema solar.</p>
      <p>Esta API permite a los desarrolladores y científicos acceder a datos de miles de exoplanetas confirmados, sus estrellas anfitrionas, y datos sobre sus propiedades físicas, órbitas y métodos de descubrimiento.</p>
      
      <h3>Punto de Acceso de la API</h3>
      <code>GET https://exoplanetarchive.ipac.caltech.edu/TAP/sync</code>
      
      <h3>Formato de Consulta</h3>
      <p>La API utiliza el protocolo Table Access Protocol (TAP) que permite realizar consultas SQL a la base de datos. Las consultas se realizan usando el parámetro <code>query</code> en formato ADQL (Astronomical Data Query Language), una variante de SQL.</p>
      
      <h3>Parámetros Principales</h3>
      <table>
        <thead>
          <tr>
            <th>Parámetro</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>query</td>
            <td>Consulta ADQL para seleccionar datos (similar a SQL)</td>
          </tr>
          <tr>
            <td>format</td>
            <td>Formato de salida (csv, json, votable, etc.)</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Tablas Principales</h3>
      <p>La API proporciona acceso a varias tablas con diferentes conjuntos de datos:</p>
      <table>
        <thead>
          <tr>
            <th>Tabla</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ps</td>
            <td>Planetas Confirmados y Propiedades Estelares (Planetary Systems)</td>
          </tr>
          <tr>
            <td>pscomppars</td>
            <td>Parámetros Calculados para Planetas Confirmados</td>
          </tr>
          <tr>
            <td>exomultpars</td>
            <td>Parámetros para Sistemas Planetarios Múltiples</td>
          </tr>
          <tr>
            <td>cumulative</td>
            <td>Todos los candidatos a planetas del telescopio Kepler</td>
          </tr>
          <tr>
            <td>koi</td>
            <td>Objetos de Interés de Kepler (Kepler Objects of Interest)</td>
          </tr>
          <tr>
            <td>k2candidates</td>
            <td>Candidatos a exoplanetas de la misión K2</td>
          </tr>
          <tr>
            <td>toi</td>
            <td>Objetos de Interés de TESS (TESS Objects of Interest)</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Columnas Populares de la Tabla PS</h3>
      <table>
        <thead>
          <tr>
            <th>Columna</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>pl_name</td>
            <td>Nombre del planeta</td>
          </tr>
          <tr>
            <td>hostname</td>
            <td>Nombre de la estrella anfitriona</td>
          </tr>
          <tr>
            <td>pl_radj</td>
            <td>Radio del planeta (en radios de Júpiter)</td>
          </tr>
          <tr>
            <td>pl_rade</td>
            <td>Radio del planeta (en radios terrestres)</td>
          </tr>
          <tr>
            <td>pl_bmassj</td>
            <td>Masa del planeta (en masas de Júpiter)</td>
          </tr>
          <tr>
            <td>pl_orbper</td>
            <td>Período orbital (días)</td>
          </tr>
          <tr>
            <td>pl_orbsmax</td>
            <td>Semieje mayor orbital (UA)</td>
          </tr>
          <tr>
            <td>pl_orbeccen</td>
            <td>Excentricidad orbital</td>
          </tr>
          <tr>
            <td>pl_eqt</td>
            <td>Temperatura de equilibrio (K)</td>
          </tr>
          <tr>
            <td>pl_disc</td>
            <td>Año de descubrimiento</td>
          </tr>
          <tr>
            <td>pl_facility</td>
            <td>Instalación utilizada para el descubrimiento</td>
          </tr>
          <tr>
            <td>st_dist</td>
            <td>Distancia a la estrella (parsecs)</td>
          </tr>
          <tr>
            <td>st_teff</td>
            <td>Temperatura efectiva de la estrella (K)</td>
          </tr>
          <tr>
            <td>st_mass</td>
            <td>Masa estelar (masas solares)</td>
          </tr>
          <tr>
            <td>st_rad</td>
            <td>Radio estelar (radios solares)</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Ejemplos de Consultas</h3>
      <h4>Consulta básica para obtener planetas habitables potenciales:</h4>
      <pre>
{`SELECT pl_name, hostname, pl_orbper, pl_rade, st_dist, pl_eqt 
FROM ps 
WHERE pl_eqt BETWEEN 180 AND 310 
AND pl_rade < 2 
ORDER BY pl_rade ASC`}
      </pre>
      
      <h4>Consulta para obtener exoplanetas descubiertos por año:</h4>
      <pre>
{`SELECT pl_disc, COUNT(*) as count 
FROM ps 
WHERE pl_disc IS NOT NULL 
GROUP BY pl_disc 
ORDER BY pl_disc ASC`}
      </pre>
      
      <h3>Formatos de Respuesta</h3>
      <p>La API puede devolver datos en varios formatos:</p>
      <ul>
        <li><strong>csv</strong> - Valores separados por comas</li>
        <li><strong>json</strong> - JavaScript Object Notation</li>
        <li><strong>votable</strong> - Formato XML para datos astronómicos</li>
        <li><strong>ipac</strong> - Formato de tabla de texto del IPAC</li>
      </ul>
      
      <h3>Ejemplo de URL Completa</h3>
      <pre>
{`https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,pl_orbper,pl_rade+from+ps+where+pl_rade<2+order+by+pl_rade+desc&format=json`}
      </pre>
      
      <h3>Limitaciones</h3>
      <p>La API tiene algunas limitaciones:</p>
      <ul>
        <li>Las consultas tienen un límite de tiempo de ejecución</li>
        <li>Algunas consultas complejas pueden requerir paginación</li>
        <li>Para conjuntos de datos muy grandes, se recomienda utilizar el servicio TAP asíncrono</li>
      </ul>
      
      <h3>Recursos Adicionales</h3>
      <p>Para obtener más información sobre las tablas disponibles y la documentación completa, visite la <a href="https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html" target="_blank" rel="noopener noreferrer">documentación oficial de TAP de NASA Exoplanet Archive</a>.</p>
    </section>
  );
}

export default InformacionExoplanetAPI;