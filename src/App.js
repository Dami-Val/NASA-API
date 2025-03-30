import React, { useState, useEffect } from 'react';
import './App.css';

// Componente principal de la aplicación
function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <InformacionAPI />
      </div>
      <div className="container">
        <ExploradorAPOD />
        <ImplementacionCodigo />
      </div>
    </div>
  );
}

// Componente del encabezado
function Header() {
  return (
    <header>
      <h1>Explorador de la API APOD de NASA</h1>
      <p>Explora la API de Imagen Astronómica del Día de la NASA</p>
    </header>
  );
}

// Componente que muestra información sobre la API
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

// Componente para explorar la API APOD
function ExploradorAPOD() {
  const API_KEY = 'bAAnDfis8xgDe7SqToTxqQKD3sWVTgMQLqJexjS0';
  const API_URL = 'https://api.nasa.gov/planetary/apod';
  
  // Estados para los formularios y resultados
  const [tipoSolicitud, setTipoSolicitud] = useState('today');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [fechaInicio, setFechaInicio] = useState(() => {
    const fechaAnterior = new Date();
    fechaAnterior.setDate(fechaAnterior.getDate() - 7);
    return fechaAnterior.toISOString().split('T')[0];
  });
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);
  const [cantidad, setCantidad] = useState(3);
  const [incluirMiniaturas, setIncluirMiniaturas] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  
  // Cargar la imagen del día al iniciar
  useEffect(() => {
    obtenerImagenDelDia();
  }, []);
  
  // Función para obtener los datos de la API APOD
  async function obtenerAPOD(params = {}) {
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
  
  // Obtener la imagen del día actual
  async function obtenerImagenDelDia() {
    setCargando(true);
    setError(null);
    
    try {
      const datos = await obtenerAPOD({ thumbs: incluirMiniaturas });
      setResultados(Array.isArray(datos) ? datos : [datos]);
    } catch (error) {
      setError(`Error al obtener datos: ${error.message}`);
    } finally {
      setCargando(false);
    }
  }
  
  // Manejar el envío del formulario
  async function manejarEnvio(e) {
    e.preventDefault();
    setCargando(true);
    setError(null);
    setResultados([]);
    
    const params = {
      thumbs: incluirMiniaturas
    };
    
    // Añadir parámetros apropiados según el tipo de solicitud
    switch(tipoSolicitud) {
      case 'today':
        // No se necesitan parámetros adicionales para hoy
        break;
        
      case 'specific-date':
        params.date = fecha;
        break;
        
      case 'date-range':
        params.start_date = fechaInicio;
        params.end_date = fechaFin;
        break;
        
      case 'random':
        params.count = cantidad;
        break;
        
      default:
        break;
    }
    
    try {
      const datos = await obtenerAPOD(params);
      setResultados(Array.isArray(datos) ? datos : [datos]);
    } catch (error) {
      setError(`Error al obtener datos: ${error.message}`);
    } finally {
      setCargando(false);
    }
  }
  
  return (
    <section className="demo-section">
      <h2>Explorador Interactivo APOD</h2>
      <p>Utiliza el formulario a continuación para explorar la API de Imagen Astronómica del Día de la NASA. Puedes obtener la imagen de hoy, una fecha específica o múltiples imágenes aleatorias.</p>
      
      <div className="warning">
        Nota: Tu clave de API está preconfigurada para esta demostración: <strong>bAAnDfis8xgDe7SqToTxqQKD3sWVTgMQLqJexjS0</strong>
      </div>
      
      <form onSubmit={manejarEnvio}>
        <div className="form-group">
          <label htmlFor="request-type">Tipo de Solicitud:</label>
          <select 
            id="request-type" 
            value={tipoSolicitud} 
            onChange={(e) => setTipoSolicitud(e.target.value)}
          >
            <option value="today">APOD de Hoy</option>
            <option value="specific-date">Fecha Específica</option>
            <option value="date-range">Rango de Fechas</option>
            <option value="random">Imágenes Aleatorias</option>
          </select>
        </div>
        
        {tipoSolicitud === 'specific-date' && (
          <div className="form-group">
            <label htmlFor="date">Seleccionar Fecha:</label>
            <input 
              type="date" 
              id="date" 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
        )}
        
        {tipoSolicitud === 'date-range' && (
          <>
            <div className="form-group">
              <label htmlFor="start-date">Fecha de Inicio:</label>
              <input 
                type="date" 
                id="start-date" 
                value={fechaInicio} 
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="end-date">Fecha Final:</label>
              <input 
                type="date" 
                id="end-date" 
                value={fechaFin} 
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
          </>
        )}
        
        {tipoSolicitud === 'random' && (
          <div className="form-group">
            <label htmlFor="count">Número de Imágenes Aleatorias (1-10):</label>
            <input 
              type="number" 
              id="count" 
              min="1" 
              max="10" 
              value={cantidad} 
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
        )}
        
        <div className="form-group">
          <label>
            <input 
              type="checkbox" 
              checked={incluirMiniaturas} 
              onChange={(e) => setIncluirMiniaturas(e.target.checked)}
            /> 
            Incluir Miniaturas de Video
          </label>
        </div>
        
        <button type="submit">Obtener APOD</button>
      </form>
      
      {cargando && (
        <div className="loading">
          Cargando datos desde la API de NASA...
        </div>
      )}
      
      {error && (
        <div className="apod-info error">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      
      <ResultadosAPOD resultados={resultados} />
    </section>
  );
}

// Componente para mostrar los resultados de APOD
function ResultadosAPOD({ resultados }) {
  if (!resultados || resultados.length === 0) {
    return null;
  }
  
  return (
    <div className="apod-results">
      {resultados.map((apod, index) => (
        <TarjetaAPOD key={`${apod.date}-${index}`} apod={apod} index={index} />
      ))}
    </div>
  );
}

// Componente para una tarjeta individual de APOD
function TarjetaAPOD({ apod, index }) {
  // Determinar el título basado en si es una colección o un solo resultado
  const titulo = index !== undefined ? 
    <h3>{apod.title} ({apod.date})</h3> : 
    <h3>{apod.title}</h3>;
  
  // Determinar el contenido media basado en el tipo
  let contenidoMedia;
  if (apod.media_type === 'image') {
    contenidoMedia = (
      <>
        <a href={apod.hdurl || apod.url} target="_blank" rel="noopener noreferrer">
          <img src={apod.url} alt={apod.title} className="apod-img" />
        </a>
        <p><small>Haz clic en la imagen para ver resolución completa</small></p>
      </>
    );
  } else if (apod.media_type === 'video') {
    if (apod.url.includes('youtube') || apod.url.includes('youtu.be')) {
      // Convertir URL de YouTube a URL de embed si es necesario
      let urlEmbed = apod.url;
      if (urlEmbed.includes('watch?v=')) {
        const videoId = new URL(urlEmbed).searchParams.get('v');
        urlEmbed = `https://www.youtube.com/embed/${videoId}`;
      } else if (urlEmbed.includes('youtu.be/')) {
        const videoId = urlEmbed.split('youtu.be/')[1];
        urlEmbed = `https://www.youtube.com/embed/${videoId}`;
      }
      
      contenidoMedia = (
        <>
          <iframe 
            className="apod-video" 
            src={urlEmbed}
            title={apod.title}
            frameBorder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
          
          {apod.thumbnail_url && (
            <p>
              <small>
                Miniatura del video: <a href={apod.thumbnail_url} target="_blank" rel="noopener noreferrer">{apod.thumbnail_url}</a>
              </small>
            </p>
          )}
        </>
      );
    } else {
      // Para otros tipos de video
      contenidoMedia = (
        <>
          <p>
            Video: <a href={apod.url} target="_blank" rel="noopener noreferrer">{apod.url}</a>
          </p>
          
          {apod.thumbnail_url && (
            <div>
              <img src={apod.thumbnail_url} alt="Miniatura del video" className="apod-img" />
              <p><small>Miniatura del video</small></p>
            </div>
          )}
        </>
      );
    }
  }
  
  // Añadir información de copyright si está disponible
  const copyright = apod.copyright ? 
    <p><small>© {apod.copyright}</small></p> : 
    null;
  
  return (
    <div className="apod-display">
      {titulo}
      <p><em>Fecha: {apod.date}</em></p>
      {contenidoMedia}
      <div className="apod-info">
        <p>{apod.explanation}</p>
        {copyright}
      </div>
      <hr />
    </div>
  );
}

// Componente que muestra el código de implementación
function ImplementacionCodigo() {
  return (
    <section className="code-section">
      <h2>Código de Implementación</h2>
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

export default App;