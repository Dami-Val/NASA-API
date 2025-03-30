import React, { useState, useEffect } from 'react';
import './App.css';

// Componente principal de la aplicación
function App() {
  // Estado para controlar qué API se muestra
  const [apiActiva, setApiActiva] = useState('apod');

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="api-selector">
          <button 
            className={apiActiva === 'apod' ? 'active' : ''} 
            onClick={() => setApiActiva('apod')}
          >
            Explorador APOD
          </button>
          <button 
            className={apiActiva === 'rover' ? 'active' : ''} 
            onClick={() => setApiActiva('rover')}
          >
            Fotos Mars Rover
          </button>
        </div>
      </div>
      
      {apiActiva === 'apod' ? (
        <>
          <div className="container">
            <InformacionAPI />
          </div>
          <div className="container">
            <ExploradorAPOD />
            <ImplementacionCodigo />
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <InformacionRoverAPI />
          </div>
          <div className="container">
            <ExploradorRover />
            <ImplementacionCodigoRover />
          </div>
        </>
      )}
    </div>
  );
}

// Componente del encabezado
function Header() {
  return (
    <header>
      <h1>Explorador de APIs de NASA</h1>
      <p>En este Blog, explora las maravillosas funcionalidades que nos ofrecen las APIs gratuitas de la NASA.</p>
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

// Componente que muestra información sobre la API Mars Rover Photos
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
        Nota: Tu clave de API está preconfigurada para esta demostración: <strong>{API_KEY}</strong>
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

// Componente para explorar la API Mars Rover Photos
function ExploradorRover() {
  const API_KEY = 'bAAnDfis8xgDe7SqToTxqQKD3sWVTgMQLqJexjS0';
  const API_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers';
  
  // Estados para los formularios y resultados
  const [rover, setRover] = useState('curiosity');
  const [tipoConsulta, setTipoConsulta] = useState('sol');
  const [sol, setSol] = useState(1000);
  const [fechaTierra, setFechaTierra] = useState('2015-06-03');
  const [camara, setCamara] = useState('');
  const [pagina, setPagina] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [fotos, setFotos] = useState([]);
  const [error, setError] = useState(null);
  const [manifiestoRover, setManifiestoRover] = useState(null);
  const [cargandoManifiesto, setCargandoManifiesto] = useState(false);
  
  // Configuración de cámaras disponibles para cada rover
  const camarasPorRover = {
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
  
  // Cargar manifiesto del rover al cambiar de rover
  useEffect(() => {
    obtenerManifiestoRover();
  }, [rover]);
  
  // Función para obtener manifiesto del rover
  async function obtenerManifiestoRover() {
    setCargandoManifiesto(true);
    setError(null);
    
    try {
      const respuesta = await fetch(`${API_URL}/${rover}/latest_photos?api_key=${API_KEY}`);
      
      if (!respuesta.ok) {
        throw new Error(`Error de API NASA: ${respuesta.status} ${respuesta.statusText}`);
      }
      
      const datos = await respuesta.json();
      
      // Obtener información del rover desde la primera foto
      if (datos.latest_photos && datos.latest_photos.length > 0) {
        const infoRover = datos.latest_photos[0].rover;
        setManifiestoRover(infoRover);
        
        // Establecer sol predeterminado a un valor válido
        if (infoRover.max_sol && sol > infoRover.max_sol) {
          setSol(Math.floor(infoRover.max_sol / 2)); // Un sol intermedio
        }
      }
    } catch (error) {
      setError(`Error al obtener manifiesto: ${error.message}`);
    } finally {
      setCargandoManifiesto(false);
    }
  }
  
  // Función para obtener fotos del rover
  async function obtenerFotosRover(params = {}) {
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
  
  // Manejar el envío del formulario
  async function manejarEnvio(e) {
    e.preventDefault();
    setCargando(true);
    setError(null);
    setFotos([]);
    
    const params = {
      page: pagina
    };
    
    // Añadir cámara si está seleccionada
    if (camara) {
      params.camera = camara;
    }
    
    // Añadir parámetros según tipo de consulta
    if (tipoConsulta === 'sol') {
      params.sol = sol;
    } else {
      params.earth_date = fechaTierra;
    }
    
    try {
      const fotosFetcheadas = await obtenerFotosRover(params);
      setFotos(fotosFetcheadas);
      
      if (fotosFetcheadas.length === 0) {
        setError('No se encontraron fotos para los criterios seleccionados.');
      }
    } catch (error) {
      setError(`Error al obtener fotos: ${error.message}`);
    } finally {
      setCargando(false);
    }
  }
  
  // Función para cambiar de página
  function cambiarPagina(nuevaPagina) {
    if (nuevaPagina >= 1) {
      setPagina(nuevaPagina);
      // Recargar fotos con la nueva página
      const formElement = document.getElementById('form-rover');
      if (formElement) {
        formElement.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }
  }

  return (
    <section className="demo-section">
      <h2>Explorador de Fotos de Mars Rover</h2>
      <p>Utiliza el formulario a continuación para explorar las fotos tomadas por los rovers de Marte. Puedes filtrar por rover, sol marciano o fecha terrestre, y por cámara.</p>
      
      <div className="warning">
        Nota: Tu clave de API está preconfigurada para esta demostración: <strong>{API_KEY}</strong>
      </div>
      
      {cargandoManifiesto ? (
        <div className="loading">
          Cargando información del rover...
        </div>
      ) : manifiestoRover ? (
        <div className="rover-info">
          <h3>Información del Rover: {manifiestoRover.name}</h3>
          <p>Estado: <strong>{manifiestoRover.status}</strong></p>
          <p>Fecha de lanzamiento: <strong>{manifiestoRover.launch_date}</strong></p>
          <p>Fecha de aterrizaje: <strong>{manifiestoRover.landing_date}</strong></p>
          <p>Sol máximo: <strong>{manifiestoRover.max_sol}</strong></p>
          <p>Última fecha terrestre: <strong>{manifiestoRover.max_date}</strong></p>
          <p>Total de fotos: <strong>{manifiestoRover.total_photos}</strong></p>
        </div>
      ) : null}
      
      <form id="form-rover" onSubmit={manejarEnvio}>
        <div className="form-group">
          <label htmlFor="rover">Seleccionar Rover:</label>
          <select 
            id="rover" 
            value={rover} 
            onChange={(e) => setRover(e.target.value)}
          >
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="query-type">Tipo de Consulta:</label>
          <select 
            id="query-type" 
            value={tipoConsulta} 
            onChange={(e) => setTipoConsulta(e.target.value)}
          >
            <option value="sol">Por Sol Marciano</option>
            <option value="earth_date">Por Fecha Terrestre</option>
          </select>
        </div>
        
        {tipoConsulta === 'sol' ? (
          <div className="form-group">
            <label htmlFor="sol">Sol Marciano:</label>
            <input 
              type="number" 
              id="sol" 
              min="0" 
              max={manifiestoRover?.max_sol || 9999}
              value={sol} 
              onChange={(e) => setSol(e.target.value)}
            />
            {manifiestoRover && (
              <small>Rango válido: 0 - {manifiestoRover.max_sol}</small>
            )}
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="earth-date">Fecha Terrestre:</label>
            <input 
              type="date" 
              id="earth-date" 
              value={fechaTierra} 
              onChange={(e) => setFechaTierra(e.target.value)}
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="camera">Cámara (opcional):</label>
          <select 
            id="camera" 
            value={camara} 
            onChange={(e) => setCamara(e.target.value)}
          >
            <option value="">Todas las cámaras</option>
            {camarasPorRover[rover].map(cam => (
              <option key={cam.id} value={cam.id}>
                {cam.id} - {cam.nombre}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="page">Página:</label>
          <input 
            type="number" 
            id="page" 
            min="1" 
            value={pagina} 
            onChange={(e) => setPagina(e.target.value)}
          />
          <small>25 fotos por página</small>
        </div>
        
        <button type="submit">Buscar Fotos</button>
      </form>
      
      {cargando && (
        <div className="loading">
          Cargando fotos desde la API de NASA...
        </div>
      )}
      
      {error && (
        <div className="apod-info error">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Resultados de fotos */}
      {fotos.length > 0 && (
        <div className="rover-results">
          <h3>Fotos encontradas: {fotos.length}</h3>
          
          {/* Controles de paginación */}
          <div className="pagination-controls">
            <button 
              onClick={() => cambiarPagina(pagina - 1)} 
              disabled={pagina <= 1}
            >
              Página anterior
            </button>
            <span>Página {pagina}</span>
            <button 
              onClick={() => cambiarPagina(pagina + 1)} 
              disabled={fotos.length < 25}
            >
              Página siguiente
            </button>
          </div>
          
          <div className="photo-grid">
            {fotos.map(foto => (
              <div key={foto.id} className="rover-photo">
                <a href={foto.img_src} target="_blank" rel="noopener noreferrer">
                  <img src={foto.img_src} alt={`Foto de ${foto.rover.name} - ${foto.camera.full_name}`} />
                </a>
                <div className="photo-info">
                  <p><strong>ID:</strong> {foto.id}</p>
                  <p><strong>Rover:</strong> {foto.rover.name}</p>
                  <p><strong>Cámara:</strong> {foto.camera.full_name} ({foto.camera.name})</p>
                  <p><strong>Sol:</strong> {foto.sol}</p>
                  <p><strong>Fecha terrestre:</strong> {foto.earth_date}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Controles de paginación inferiores */}
          {fotos.length >= 25 && (
            <div className="pagination-controls">
              <button 
                onClick={() => cambiarPagina(pagina - 1)} 
                disabled={pagina <= 1}
              >
                Página anterior
              </button>
              <span>Página {pagina}</span>
              <button 
                onClick={() => cambiarPagina(pagina + 1)}
              >
                Página siguiente
              </button>
            </div>
          )}
        </div>
      )}
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

// Componente que muestra el código de implementación para APOD
function ImplementacionCodigo() {
  return (
    <section className="code-section">
      <h2>Código de Implementación APOD</h2>
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

// Componente que muestra el código de implementación para Mars Rover Photos
function ImplementacionCodigoRover() {
  return (
    <section className="code-section">
      <h2>Código de Implementación Mars Rover Photos</h2>
      <p>Aquí está el código JavaScript utilizado para interactuar con la API Mars Rover Photos en esta demostración:</p>
      <pre>
{`const API_KEY = 'bAAnDfis8xgDe7SqToTxqQKD3sWVTgMQLqJexjS0';
const API_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers';

async function obtenerFotosRover(rover, params = {}) {
    // Añadir clave API a los parámetros
    params.api_key = API_KEY;
    
    // Construir URL base
    let url = \`\${API_URL}/\${rover}/photos\`;
    
    // Convertir objeto de parámetros a cadena de consulta URL
    const cadenaConsulta = Object.keys(params)
        .map(key => \`\${encodeURIComponent(key)}=\${encodeURIComponent(params[key])}\`)
        .join('&');
    
    // Realizar solicitud a la API
    const respuesta = await fetch(\`\${url}?\${cadenaConsulta}\`);
    
    // Verificar si la solicitud fue exitosa
    if (!respuesta.ok) {
        throw new Error(\`Error de API NASA: \${respuesta.status} \${respuesta.statusText}\`);
    }
    
    // Analizar y devolver la respuesta JSON
    const datos = await respuesta.json();
    return datos.photos || [];
}

// Ejemplo: Obtener fotos de Curiosity en sol 1000
obtenerFotosRover('curiosity', { sol: 1000 })
    .then(fotos => {
        console.log('Fotos de Curiosity en sol 1000:', fotos);
        mostrarFotos(fotos);
    })
    .catch(error => {
        console.error('Error al obtener fotos:', error);
    });

// Ejemplo: Obtener fotos de Opportunity de una fecha específica
obtenerFotosRover('opportunity', { earth_date: '2015-06-03' })
    .then(fotos => {
        console.log('Fotos de Opportunity del 3 de junio de 2015:', fotos);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Ejemplo: Obtener fotos de Spirit con una cámara específica
obtenerFotosRover('spirit', { sol: 1000, camera: 'pancam' })
    .then(fotos => {
        console.log('Fotos de Spirit con PANCAM en sol 1000:', fotos);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Ejemplo: Obtener manifiesto de misión para un rover
async function obtenerManifiestoRover(rover) {
    try {
        const respuesta = await fetch(\`\${API_URL}/\${rover}/latest_photos?api_key=\${API_KEY}\`);
        
        if (!respuesta.ok) {
            throw new Error(\`Error de API NASA: \${respuesta.status} \${respuesta.statusText}\`);
        }
        
        const datos = await respuesta.json();
        
        // Obtener información del rover desde la primera foto
        if (datos.latest_photos && datos.latest_photos.length > 0) {
            return datos.latest_photos[0].rover;
        }
        
        return null;
    } catch (error) {
        console.error('Error al obtener manifiesto:', error);
        return null;
    }
}`}
      </pre>
    </section>
  );
}

export default App;