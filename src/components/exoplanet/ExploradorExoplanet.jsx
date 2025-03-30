import React, { useState, useEffect } from 'react';
import { 
  consultarExoplanetas, 
  consultarExoplanetasPorFiltros, 
  consultarEstadisticasExoplanetas,
  obtenerDetallesExoplaneta 
} from '../../services/exoplanetService';

function ExploradorExoplanet() {
  // Estados para los formularios y resultados
  const [tipoConsulta, setTipoConsulta] = useState('predefinida');
  const [consultaPredefinida, setConsultaPredefinida] = useState('habitables');
  const [nombrePlaneta, setNombrePlaneta] = useState('');
  const [nombreEstrella, setNombreEstrella] = useState('');
  const [radioMin, setRadioMin] = useState('');
  const [radioMax, setRadioMax] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [metodoDescubrimiento, setMetodoDescubrimiento] = useState('');
  const [distanciaMax, setDistanciaMax] = useState('');
  const [anioDescubrimiento, setAnioDescubrimiento] = useState('');
  const [orderBy, setOrderBy] = useState('pl_name');
  const [orderDir, setOrderDir] = useState('ASC');
  const [limite, setLimite] = useState(50);
  
  const [cargando, setCargando] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [planetaSeleccionado, setPlanetaSeleccionado] = useState(null);
  const [error, setError] = useState(null);
  
  // Cargar estadísticas básicas al iniciar
  useEffect(() => {
    obtenerEstadisticas();
  }, []);
  
  // Función para obtener estadísticas generales
  async function obtenerEstadisticas() {
    try {
      setCargando(true);
      const data = await consultarEstadisticasExoplanetas();
      setEstadisticas(data);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      setError('No se pudieron cargar las estadísticas de exoplanetas.');
    } finally {
      setCargando(false);
    }
  }
  
  // Función para ejecutar consulta predefinida
  async function ejecutarConsultaPredefinida() {
    setCargando(true);
    setError(null);
    setResultados([]);
    setPlanetaSeleccionado(null);
    
    try {
      let resultadosData;
      
      switch (consultaPredefinida) {
        case 'habitables':
          resultadosData = await consultarExoplanetas(
            `SELECT pl_name, hostname, pl_orbper, pl_rade, pl_bmasse, st_dist, pl_eqt, pl_disc, pl_facility, rowupdate 
             FROM ps 
             WHERE pl_eqt BETWEEN 180 AND 310 
             AND pl_rade < 2 
             ORDER BY pl_eqt ASC`,
            limite
          );
          break;
          
        case 'gigantes_gaseosos':
          resultadosData = await consultarExoplanetas(
            `SELECT pl_name, hostname, pl_orbper, pl_radj, pl_bmassj, st_dist, pl_eqt, pl_disc, pl_facility, rowupdate 
             FROM ps 
             WHERE pl_radj > 0.7 
             AND pl_bmassj > 0.3 
             ORDER BY pl_bmassj DESC`,
            limite
          );
          break;
          
        case 'super_tierras':
          resultadosData = await consultarExoplanetas(
            `SELECT pl_name, hostname, pl_orbper, pl_rade, pl_bmasse, st_dist, pl_eqt, pl_disc, pl_facility, rowupdate 
             FROM ps 
             WHERE pl_rade BETWEEN 1.2 AND 2.0 
             ORDER BY pl_rade ASC`,
            limite
          );
          break;
          
        case 'cercanos':
          resultadosData = await consultarExoplanetas(
            `SELECT pl_name, hostname, pl_orbper, pl_rade, pl_bmasse, st_dist, pl_eqt, pl_disc, pl_facility, rowupdate 
             FROM ps 
             WHERE st_dist IS NOT NULL 
             ORDER BY st_dist ASC`,
            limite
          );
          break;
          
        case 'recientes':
          resultadosData = await consultarExoplanetas(
            `SELECT pl_name, hostname, pl_orbper, pl_rade, pl_bmasse, st_dist, pl_eqt, pl_disc, pl_facility, rowupdate 
             FROM ps 
             WHERE pl_disc IS NOT NULL 
             ORDER BY pl_disc DESC, rowupdate DESC`,
            limite
          );
          break;
          
        default:
          resultadosData = await consultarExoplanetas(
            `SELECT pl_name, hostname, pl_orbper, pl_rade, pl_bmasse, st_dist, pl_eqt, pl_disc, pl_facility, rowupdate 
             FROM ps 
             ORDER BY rowupdate DESC`,
            limite
          );
      }
      
      setResultados(resultadosData);
      
      if (resultadosData.length === 0) {
        setError('No se encontraron exoplanetas para los criterios seleccionados.');
      }
    } catch (error) {
      console.error('Error al ejecutar consulta predefinida:', error);
      setError(`Error al obtener datos: ${error.message}`);
    } finally {
      setCargando(false);
    }
  }
  
  // Función para ejecutar consulta personalizada
  async function ejecutarConsultaPersonalizada() {
    setCargando(true);
    setError(null);
    setResultados([]);
    setPlanetaSeleccionado(null);
    
    // Construir filtros
    const filtros = {};
    if (nombrePlaneta) filtros.pl_name = nombrePlaneta;
    if (nombreEstrella) filtros.hostname = nombreEstrella;
    if (radioMin) filtros.pl_rade_min = parseFloat(radioMin);
    if (radioMax) filtros.pl_rade_max = parseFloat(radioMax);
    if (tempMin) filtros.pl_eqt_min = parseInt(tempMin);
    if (tempMax) filtros.pl_eqt_max = parseInt(tempMax);
    if (metodoDescubrimiento) filtros.pl_discmethod = metodoDescubrimiento;
    if (distanciaMax) filtros.st_dist_max = parseFloat(distanciaMax);
    if (anioDescubrimiento) filtros.pl_disc = parseInt(anioDescubrimiento);
    
    // Validar que hay al menos un filtro
    if (Object.keys(filtros).length === 0) {
      setError('Por favor, seleccione al menos un criterio de búsqueda.');
      setCargando(false);
      return;
    }
    
    try {
      // Configurar ordenamiento
      const ordenamiento = {
        campo: orderBy,
        direccion: orderDir
      };
      
      const resultadosData = await consultarExoplanetasPorFiltros(filtros, ordenamiento, limite);
      setResultados(resultadosData);
      
      if (resultadosData.length === 0) {
        setError('No se encontraron exoplanetas para los criterios seleccionados.');
      }
    } catch (error) {
      console.error('Error al ejecutar consulta personalizada:', error);
      setError(`Error al obtener datos: ${error.message}`);
    } finally {
      setCargando(false);
    }
  }
  
  // Manejar el envío del formulario
  function manejarEnvio(e) {
    e.preventDefault();
    
    if (tipoConsulta === 'predefinida') {
      ejecutarConsultaPredefinida();
    } else {
      ejecutarConsultaPersonalizada();
    }
  }
  
  // Obtener detalles de un exoplaneta
  async function obtenerDetallesPlaneta(nombrePlaneta) {
    try {
      setCargando(true);
      const detalles = await obtenerDetallesExoplaneta(nombrePlaneta);
      setPlanetaSeleccionado(detalles);
      
      // Desplazar a la sección de detalles
      const detallesElement = document.getElementById('detalles-exoplaneta');
      if (detallesElement) {
        detallesElement.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error al obtener detalles del exoplaneta:', error);
      setError(`No se pudieron obtener los detalles del exoplaneta ${nombrePlaneta}.`);
    } finally {
      setCargando(false);
    }
  }
  
  // Formatear valores numéricos con unidades
  function formatearValor(valor, unidad, decimales = 2) {
    if (valor === null || valor === undefined) return 'Desconocido';
    return `${parseFloat(valor).toFixed(decimales)} ${unidad}`;
  }
  
  // Formatear temperatura
  function formatearTemperatura(temp) {
    if (temp === null || temp === undefined) return 'Desconocido';
    const tempNum = parseFloat(temp);
    return `${tempNum.toFixed(0)} K (${(tempNum - 273.15).toFixed(0)} °C)`;
  }
  
  // Determinar la clase de habitabilidad basada en la temperatura
  function obtenerClaseHabitabilidad(temp) {
    if (!temp) return 'desconocido';
    const tempNum = parseFloat(temp);
    if (tempNum < 180) return 'frio';
    if (tempNum <= 310) return 'habitable';
    return 'caliente';
  }
  
  // Determinar tipo de planeta según su radio
  function obtenerTipoPlaneta(radio) {
    if (!radio) return 'Desconocido';
    
    // Radio en Radios Terrestres
    const radioNum = parseFloat(radio);
    
    if (radioNum < 0.5) return 'Sub-Terrestre';
    if (radioNum < 1.2) return 'Terrestre';
    if (radioNum < 2.0) return 'Super-Tierra';
    if (radioNum < 4.0) return 'Mini-Neptuno';
    if (radioNum < 6.0) return 'Neptuniano';
    if (radioNum < 14.3) return 'Gigante Gaseoso';
    return 'Súper-Joviano';
  }

  return (
    <section className="demo-section">
      <h2>Explorador de Exoplanetas</h2>
      <p>Utiliza esta herramienta para explorar la base de datos de exoplanetas de NASA. Puedes realizar búsquedas predefinidas o personalizadas para encontrar planetas fuera de nuestro sistema solar.</p>
      
      {estadisticas && (
        <div className="exoplanet-stats">
          <h3>Estadísticas de Exoplanetas</h3>
          <div className="stats-container">
            <div className="stat-box">
              <span className="stat-number">{estadisticas.totalPlanetas.toLocaleString()}</span>
              <span className="stat-label">Exoplanetas confirmados</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{estadisticas.totalSistemas.toLocaleString()}</span>
              <span className="stat-label">Sistemas planetarios</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{estadisticas.potencialmenteHabitables.toLocaleString()}</span>
              <span className="stat-label">Potencialmente habitables</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{estadisticas.ultimoDescubrimiento || 'Desconocido'}</span>
              <span className="stat-label">Último año con descubrimientos</span>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={manejarEnvio}>
        <div className="form-group">
          <label htmlFor="query-type">Tipo de Búsqueda:</label>
          <select 
            id="query-type" 
            value={tipoConsulta} 
            onChange={(e) => setTipoConsulta(e.target.value)}
          >
            <option value="predefinida">Búsqueda predefinida</option>
            <option value="personalizada">Búsqueda personalizada</option>
          </select>
        </div>
        
        {tipoConsulta === 'predefinida' ? (
          <div className="form-group">
            <label htmlFor="predefined-query">Consulta Predefinida:</label>
            <select 
              id="predefined-query" 
              value={consultaPredefinida} 
              onChange={(e) => setConsultaPredefinida(e.target.value)}
            >
              <option value="habitables">Potencialmente habitables</option>
              <option value="gigantes_gaseosos">Gigantes gaseosos</option>
              <option value="super_tierras">Super-Tierras</option>
              <option value="cercanos">Más cercanos a la Tierra</option>
              <option value="recientes">Descubrimientos más recientes</option>
            </select>
          </div>
        ) : (
          <div className="custom-query-form">
            <div className="form-group">
              <label htmlFor="planet-name">Nombre del planeta (contiene):</label>
              <input 
                type="text" 
                id="planet-name" 
                placeholder="Ej: Kepler o b" 
                value={nombrePlaneta} 
                onChange={(e) => setNombrePlaneta(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="star-name">Nombre de la estrella (contiene):</label>
              <input 
                type="text" 
                id="star-name" 
                placeholder="Ej: Proxima o TRAPPIST" 
                value={nombreEstrella} 
                onChange={(e) => setNombreEstrella(e.target.value)}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="radius-min">Radio mínimo (Radios Terrestres):</label>
                <input 
                  type="number" 
                  id="radius-min" 
                  min="0.1" 
                  step="0.1" 
                  placeholder="Mín" 
                  value={radioMin} 
                  onChange={(e) => setRadioMin(e.target.value)}
                />
              </div>
              
              <div className="form-group form-group-half">
                <label htmlFor="radius-max">Radio máximo (Radios Terrestres):</label>
                <input 
                  type="number" 
                  id="radius-max" 
                  min="0.1" 
                  step="0.1" 
                  placeholder="Máx" 
                  value={radioMax} 
                  onChange={(e) => setRadioMax(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="temp-min">Temperatura mínima (K):</label>
                <input 
                  type="number" 
                  id="temp-min" 
                  min="0" 
                  step="1" 
                  placeholder="Mín" 
                  value={tempMin} 
                  onChange={(e) => setTempMin(e.target.value)}
                />
              </div>
              
              <div className="form-group form-group-half">
                <label htmlFor="temp-max">Temperatura máxima (K):</label>
                <input 
                  type="number" 
                  id="temp-max" 
                  min="0" 
                  step="1" 
                  placeholder="Máx" 
                  value={tempMax} 
                  onChange={(e) => setTempMax(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="discovery-method">Método de descubrimiento:</label>
              <select 
                id="discovery-method" 
                value={metodoDescubrimiento} 
                onChange={(e) => setMetodoDescubrimiento(e.target.value)}
              >
                <option value="">Cualquiera</option>
                <option value="Transit">Tránsito</option>
                <option value="Radial Velocity">Velocidad Radial</option>
                <option value="Imaging">Imagen Directa</option>
                <option value="Microlensing">Microlente Gravitacional</option>
                <option value="Transit Timing Variations">Variaciones de Tiempo de Tránsito</option>
                <option value="Astrometry">Astrometría</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="max-distance">Distancia máxima (parsecs):</label>
              <input 
                type="number" 
                id="max-distance" 
                min="0" 
                step="1" 
                placeholder="Distancia máxima" 
                value={distanciaMax} 
                onChange={(e) => setDistanciaMax(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="discovery-year">Año de descubrimiento:</label>
              <input 
                type="number" 
                id="discovery-year" 
                min="1990" 
                max={new Date().getFullYear()} 
                placeholder="Año" 
                value={anioDescubrimiento} 
                onChange={(e) => setAnioDescubrimiento(e.target.value)}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="order-by">Ordenar por:</label>
                <select 
                  id="order-by" 
                  value={orderBy} 
                  onChange={(e) => setOrderBy(e.target.value)}
                >
                  <option value="pl_name">Nombre del planeta</option>
                  <option value="hostname">Nombre de la estrella</option>
                  <option value="pl_disc">Año de descubrimiento</option>
                  <option value="pl_rade">Radio del planeta</option>
                  <option value="pl_bmasse">Masa del planeta</option>
                  <option value="pl_orbper">Período orbital</option>
                  <option value="st_dist">Distancia a la Tierra</option>
                  <option value="pl_eqt">Temperatura</option>
                  <option value="rowupdate">Última actualización</option>
                </select>
              </div>
              
              <div className="form-group form-group-half">
                <label htmlFor="order-dir">Dirección:</label>
                <select 
                  id="order-dir" 
                  value={orderDir} 
                  onChange={(e) => setOrderDir(e.target.value)}
                >
                  <option value="ASC">Ascendente</option>
                  <option value="DESC">Descendente</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="limit">Límite de resultados:</label>
          <select 
            id="limit" 
            value={limite} 
            onChange={(e) => setLimite(parseInt(e.target.value))}
          >
            <option value="25">25 resultados</option>
            <option value="50">50 resultados</option>
            <option value="100">100 resultados</option>
            <option value="250">250 resultados</option>
          </select>
        </div>
        
        <button type="submit">Buscar Exoplanetas</button>
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
      
      {resultados.length > 0 && (
        <div className="exoplanet-results">
          <h3>Exoplanetas encontrados: {resultados.length}</h3>
          
          <div className="exoplanet-grid">
            {resultados.map((planeta, index) => (
              <div 
                key={`${planeta.pl_name}-${index}`} 
                className={`exoplanet-card ${obtenerClaseHabitabilidad(planeta.pl_eqt)}`}
                onClick={() => obtenerDetallesPlaneta(planeta.pl_name)}
              >
                <h4 className="exoplanet-name">{planeta.pl_name}</h4>
                <p className="exoplanet-star">{planeta.hostname}</p>
                
                <div className="exoplanet-props">
                  <div className="exoplanet-prop">
                    <span className="prop-label">Tipo:</span>
                    <span className="prop-value">{obtenerTipoPlaneta(planeta.pl_rade)}</span>
                  </div>
                  
                  <div className="exoplanet-prop">
                    <span className="prop-label">Radio:</span>
                    <span className="prop-value">
                      {planeta.pl_rade ? `${parseFloat(planeta.pl_rade).toFixed(2)} R⊕` : 'Desconocido'}
                    </span>
                  </div>
                  
                  <div className="exoplanet-prop">
                    <span className="prop-label">Temperatura:</span>
                    <span className="prop-value">
                      {planeta.pl_eqt ? `${parseInt(planeta.pl_eqt)} K` : 'Desconocida'}
                    </span>
                  </div>
                  
                  <div className="exoplanet-prop">
                    <span className="prop-label">Periodo orbital:</span>
                    <span className="prop-value">
                      {planeta.pl_orbper ? `${parseFloat(planeta.pl_orbper).toFixed(1)} días` : 'Desconocido'}
                    </span>
                  </div>
                  
                  <div className="exoplanet-prop">
                    <span className="prop-label">Distancia:</span>
                    <span className="prop-value">
                      {planeta.st_dist ? `${parseFloat(planeta.st_dist).toFixed(1)} pc` : 'Desconocida'}
                    </span>
                  </div>
                  
                  <div className="exoplanet-prop">
                    <span className="prop-label">Descubierto:</span>
                    <span className="prop-value">{planeta.pl_disc || 'Desconocido'}</span>
                  </div>
                </div>
                
                <div className="exoplanet-action">
                  <span>Ver detalles</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
    );
}
export default ExploradorExoplanet;
