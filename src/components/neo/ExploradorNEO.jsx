import React, { useState, useEffect } from 'react';
import { obtenerNEOEnRango, obtenerNEOPorId, obtenerEstadisticasNEO, API_KEY_VALUE } from '../../services/neoService';
import { obtenerFechaActual, obtenerFechaAnterior } from '../../utils/dateUtils';

function ExploradorNEO() {
  // Estados para los formularios y resultados
  const [tipoConsulta, setTipoConsulta] = useState('feed');
  const [fechaInicio, setFechaInicio] = useState(obtenerFechaAnterior(7));
  const [fechaFin, setFechaFin] = useState(obtenerFechaActual());
  const [asteroidId, setAsteroidId] = useState('');
  const [pagina, setPagina] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [resultados, setResultados] = useState(null);
  const [asteroideSeleccionado, setAsteroideSeleccionado] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [error, setError] = useState(null);
  
  // Al cargar el componente, obtener estadísticas generales
  useEffect(() => {
    obtenerEstadisticas();
  }, []);
  
  // Función para obtener estadísticas generales de NEO
  async function obtenerEstadisticas() {
    setCargando(true);
    setError(null);
    
    try {
      const datos = await obtenerEstadisticasNEO();
      setEstadisticas(datos);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      setError('No se pudieron cargar las estadísticas de NEO.');
    } finally {
      setCargando(false);
    }
  }
  
  // Función para obtener asteroides en un rango de fechas
  async function obtenerAsteroidesEnRango() {
    setCargando(true);
    setError(null);
    setResultados(null);
    setAsteroideSeleccionado(null);
    
    try {
      // Validar rango de fechas (máximo 7 días)
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      const diasDiferencia = Math.round((fin - inicio) / (1000 * 60 * 60 * 24));
      
      if (diasDiferencia > 7) {
        setError('El rango máximo permitido es de 7 días. Por favor, ajuste las fechas.');
        setCargando(false);
        return;
      }
      
      if (diasDiferencia < 0) {
        setError('La fecha de inicio debe ser anterior a la fecha final.');
        setCargando(false);
        return;
      }
      
      const datos = await obtenerNEOEnRango(fechaInicio, fechaFin);
      setResultados(datos);
      
      // Si no hay resultados
      if (Object.keys(datos.near_earth_objects).length === 0) {
        setError('No se encontraron asteroides para el rango de fechas seleccionado.');
      }
    } catch (error) {
      console.error('Error al obtener asteroides:', error);
      setError(`Error al obtener datos: ${error.message}`);
    } finally {
      setCargando(false);
    }
  }
  
  // Función para obtener un asteroide específico por ID
  async function obtenerAsteroidePorId() {
    if (!asteroidId.trim()) {
      setError('Por favor, ingrese un ID de asteroide válido.');
      return;
    }
    
    setCargando(true);
    setError(null);
    setResultados(null);
    setAsteroideSeleccionado(null);
    
    try {
      const datos = await obtenerNEOPorId(asteroidId);
      setAsteroideSeleccionado(datos);
    } catch (error) {
      console.error('Error al obtener asteroide:', error);
      setError(`No se pudo encontrar el asteroide con ID: ${asteroidId}. Verifique el ID e intente nuevamente.`);
    } finally {
      setCargando(false);
    }
  }
  
  // Manejar el envío del formulario
  function manejarEnvio(e) {
    e.preventDefault();
    
    if (tipoConsulta === 'feed') {
      obtenerAsteroidesEnRango();
    } else if (tipoConsulta === 'lookup') {
      obtenerAsteroidePorId();
    }
  }
  
  // Función para mostrar detalles de un asteroide
  function mostrarDetallesAsteroide(asteroide) {
    setAsteroideSeleccionado(asteroide);
    window.scrollTo({ top: document.getElementById('detalle-asteroide').offsetTop, behavior: 'smooth' });
  }
  
  // Función para formatear la distancia en kilómetros
  function formatearDistancia(distancia) {
    return new Intl.NumberFormat('es-ES').format(Math.round(parseFloat(distancia)));
  }
  
  // Función para formatear la velocidad en km/h
  function formatearVelocidad(velocidad) {
    return new Intl.NumberFormat('es-ES').format(Math.round(parseFloat(velocidad)));
  }
  
  // Función para formatear el diámetro
  function formatearDiametro(min, max) {
    return `${(min * 1000).toFixed(0)} - ${(max * 1000).toFixed(0)} metros`;
  }

  return (
    <section className="demo-section">
      <h2>Explorador de Objetos Cercanos a la Tierra (NEO)</h2>
      <p>Utiliza esta herramienta para explorar la base de datos de asteroides cercanos a la Tierra de la NASA. Puedes buscar por rango de fechas o por ID específico de asteroide.</p>
      
      {estadisticas && (
        <div className="neo-stats">
          <h3>Estadísticas Globales de NEO</h3>
          <div className="stats-container">
            <div className="stat-box">
              <span className="stat-number">{estadisticas.near_earth_object_count.toLocaleString()}</span>
              <span className="stat-label">Total de NEOs</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{estadisticas.close_approach_count.toLocaleString()}</span>
              <span className="stat-label">Aproximaciones cercanas registradas</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{estadisticas.last_updated ? new Date(estadisticas.last_updated).toLocaleDateString() : 'Desconocido'}</span>
              <span className="stat-label">Última actualización</span>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={manejarEnvio}>
        <div className="form-group">
          <label htmlFor="query-type">Tipo de Consulta:</label>
          <select 
            id="query-type" 
            value={tipoConsulta} 
            onChange={(e) => setTipoConsulta(e.target.value)}
          >
            <option value="feed">Buscar por rango de fechas</option>
            <option value="lookup">Buscar por ID de asteroide</option>
          </select>
        </div>
        
        {tipoConsulta === 'feed' ? (
          <>
            <div className="form-group">
              <label htmlFor="start-date">Fecha de Inicio:</label>
              <input 
                type="date" 
                id="start-date" 
                max={fechaFin}
                value={fechaInicio} 
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="end-date">Fecha Final:</label>
              <input 
                type="date" 
                id="end-date" 
                min={fechaInicio}
                max={obtenerFechaActual()}
                value={fechaFin} 
                onChange={(e) => setFechaFin(e.target.value)}
              />
              <small>Nota: El rango máximo permitido es de 7 días</small>
            </div>
          </>
        ) : (
          <div className="form-group">
            <label htmlFor="asteroid-id">ID del Asteroide:</label>
            <input 
              type="text" 
              id="asteroid-id" 
              placeholder="Ej: 3542519" 
              value={asteroidId} 
              onChange={(e) => setAsteroidId(e.target.value)}
            />
            <small>Ingrese el ID numérico de un asteroide específico</small>
          </div>
        )}
        
        <button type="submit">Buscar</button>
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
      
      {resultados && tipoConsulta === 'feed' && (
        <div className="neo-results">
          <h3>Asteroides encontrados</h3>
          <p>Total de asteroides en el período: <strong>{resultados.element_count}</strong></p>
          
          {Object.keys(resultados.near_earth_objects).map(fecha => (
            <div key={fecha} className="neo-date-group">
              <h4>Fecha: {new Date(fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
              <div className="neo-grid">
                {resultados.near_earth_objects[fecha].map(asteroide => (
                  <div 
                    key={asteroide.id} 
                    className={`neo-card ${asteroide.is_potentially_hazardous_asteroid ? 'hazardous' : 'safe'}`}
                    onClick={() => mostrarDetallesAsteroide(asteroide)}
                  >
                    <h5>{asteroide.name}</h5>
                    <div className="neo-info-row">
                      <span className="neo-label">Diámetro est.:</span>
                      <span className="neo-value">{formatearDiametro(
                        asteroide.estimated_diameter.kilometers.estimated_diameter_min,
                        asteroide.estimated_diameter.kilometers.estimated_diameter_max
                      )}</span>
                    </div>
                    <div className="neo-info-row">
                      <span className="neo-label">Distancia mínima:</span>
                      <span className="neo-value">{formatearDistancia(
                        asteroide.close_approach_data[0].miss_distance.kilometers
                      )} km</span>
                    </div>
                    <div className="neo-info-row">
                      <span className="neo-label">Velocidad:</span>
                      <span className="neo-value">{formatearVelocidad(
                        asteroide.close_approach_data[0].relative_velocity.kilometers_per_hour
                      )} km/h</span>
                    </div>
                    <div className="neo-danger-indicator">
                      {asteroide.is_potentially_hazardous_asteroid ? 
                        'Potencialmente peligroso' : 
                        'No peligroso'
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div id="detalle-asteroide">
        {asteroideSeleccionado && (
          <div className="neo-detail">
            <h3>Detalles del Asteroide</h3>
            <div className={`neo-detail-card ${asteroideSeleccionado.is_potentially_hazardous_asteroid ? 'hazardous' : 'safe'}`}>
              <div className="neo-header">
                <h4>{asteroideSeleccionado.name}</h4>
                <span className="neo-id">ID: {asteroideSeleccionado.id}</span>
                {asteroideSeleccionado.is_potentially_hazardous_asteroid && (
                  <div className="hazard-warning">
                    ⚠️ Clasificado como potencialmente peligroso
                  </div>
                )}
              </div>
              
              <div className="neo-section">
                <h5>Información Básica</h5>
                <div className="neo-detail-row">
                  <span className="neo-detail-label">Designación:</span>
                  <span className="neo-detail-value">{asteroideSeleccionado.designation || 'N/A'}</span>
                </div>
                <div className="neo-detail-row">
                  <span className="neo-detail-label">Magnitud absoluta:</span>
                  <span className="neo-detail-value">{asteroideSeleccionado.absolute_magnitude_h} H</span>
                </div>
                <div className="neo-detail-row">
                  <span className="neo-detail-label">Diámetro estimado:</span>
                  <span className="neo-detail-value">
                    Mínimo: {(asteroideSeleccionado.estimated_diameter.kilometers.estimated_diameter_min * 1000).toFixed(0)} metros<br />
                    Máximo: {(asteroideSeleccionado.estimated_diameter.kilometers.estimated_diameter_max * 1000).toFixed(0)} metros
                  </span>
                </div>
                <div className="neo-detail-row">
                  <span className="neo-detail-label">Primer avistamiento:</span>
                  <span className="neo-detail-value">
                    {asteroideSeleccionado.orbital_data?.first_observation_date || 'Desconocido'}
                  </span>
                </div>
              </div>
              
              {asteroideSeleccionado.close_approach_data && asteroideSeleccionado.close_approach_data.length > 0 && (
                <div className="neo-section">
                  <h5>Aproximaciones Cercanas</h5>
                  <div className="close-approaches">
                    {asteroideSeleccionado.close_approach_data.slice(0, 5).map((aproximacion, index) => (
                      <div key={index} className="approach-card">
                        <div className="approach-date">
                          {new Date(aproximacion.close_approach_date).toLocaleDateString('es-ES', { 
                            year: 'numeric', month: 'long', day: 'numeric' 
                          })}
                        </div>
                        <div className="approach-detail">
                          <span>Distancia: </span>
                          <span>{formatearDistancia(aproximacion.miss_distance.kilometers)} km</span>
                        </div>
                        <div className="approach-detail">
                          <span>Velocidad relativa: </span>
                          <span>{formatearVelocidad(aproximacion.relative_velocity.kilometers_per_hour)} km/h</span>
                        </div>
                        <div className="approach-detail">
                          <span>Cuerpo orbital: </span>
                          <span>{aproximacion.orbiting_body}</span>
                        </div>
                      </div>
                    ))}
                    
                    {asteroideSeleccionado.close_approach_data.length > 5 && (
                      <div className="more-approaches">
                        + {asteroideSeleccionado.close_approach_data.length - 5} aproximaciones adicionales
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {asteroideSeleccionado.orbital_data && (
                <div className="neo-section">
                  <h5>Datos Orbitales</h5>
                  <div className="neo-detail-row">
                    <span className="neo-detail-label">Semieje mayor:</span>
                    <span className="neo-detail-value">
                      {parseFloat(asteroideSeleccionado.orbital_data.semi_major_axis).toFixed(2)} AU
                    </span>
                  </div>
                  <div className="neo-detail-row">
                    <span className="neo-detail-label">Excentricidad:</span>
                    <span className="neo-detail-value">
                      {parseFloat(asteroideSeleccionado.orbital_data.eccentricity).toFixed(4)}
                    </span>
                  </div>
                  <div className="neo-detail-row">
                    <span className="neo-detail-label">Inclinación:</span>
                    <span className="neo-detail-value">
                      {parseFloat(asteroideSeleccionado.orbital_data.inclination).toFixed(2)}°
                    </span>
                  </div>
                  <div className="neo-detail-row">
                    <span className="neo-detail-label">Período orbital:</span>
                    <span className="neo-detail-value">
                      {parseFloat(asteroideSeleccionado.orbital_data.orbital_period).toFixed(2)} días
                    </span>
                  </div>
                </div>
              )}
              
              {asteroideSeleccionado.links && (
                <div className="neo-links">
                  <a 
                    href={asteroideSeleccionado.links.nasa_jpl_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="neo-external-link"
                  >
                    Ver en NASA JPL
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExploradorNEO;