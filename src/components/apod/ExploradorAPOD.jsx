import React, { useState, useEffect } from 'react';
import { obtenerAPOD, API_KEY_VALUE } from '../../services/apodService';
import ResultadosAPOD from './ResultadosAPOD';

function ExploradorAPOD() {
  const API_KEY = API_KEY_VALUE;
  
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

export default ExploradorAPOD;