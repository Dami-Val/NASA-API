import React, { useState, useEffect } from 'react';
import { obtenerImagenesRecientes, obtenerImagenesPorFecha, obtenerFechasDisponibles, API_KEY_VALUE } from '../../services/epicService';
import { formatearFecha } from '../../utils/dateUtils';

function ExploradorEPIC() {
  const API_KEY = API_KEY_VALUE;
  
  // Estados para los formularios y resultados
  const [coleccion, setColeccion] = useState('natural');
  const [tipoConsulta, setTipoConsulta] = useState('latest');
  const [fecha, setFecha] = useState('');
  const [fechasDisponibles, setFechasDisponibles] = useState([]);
  const [cargandoFechas, setCargandoFechas] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  
  // Cargar fechas disponibles al cambiar la colección
  useEffect(() => {
    cargarFechasDisponibles();
  }, [coleccion]);
  
  // Cargar imágenes más recientes al inicio o cuando cambian las fechas disponibles
  useEffect(() => {
    if (fechasDisponibles.length > 0) {
      // Por defecto, seleccionar la fecha más reciente
      setFecha(fechasDisponibles[0]);
      // Cargar imágenes de la fecha más reciente
      cargarImagenes('date', fechasDisponibles[0]);
    } else if (!cargandoFechas) {
      // Si aún no tenemos fechas y no estamos cargándolas, cargar las imágenes más recientes
      cargarImagenes('latest');
    }
  }, [fechasDisponibles, cargandoFechas]);
  
  // Función para cargar fechas disponibles
  async function cargarFechasDisponibles() {
    setCargandoFechas(true);
    setError(null);
    
    try {
      const fechas = await obtenerFechasDisponibles(coleccion);
      setFechasDisponibles(fechas);
      
      // Si no hay una fecha seleccionada y hay fechas disponibles, seleccionar la más reciente
      if ((!fecha || fecha === '') && fechas.length > 0) {
        setFecha(fechas[0]);
      }
    } catch (error) {
      setError(`Error al obtener fechas disponibles: ${error.message}`);
      setFechasDisponibles([]);
    } finally {
      setCargandoFechas(false);
    }
  }
  
  // Función para cargar imágenes
  async function cargarImagenes(tipo = 'latest', fechaConsulta = '') {
    setCargando(true);
    setError(null);
    setImagenSeleccionada(null);
    
    try {
      let imagenesData;
      
      if (tipo === 'latest') {
        imagenesData = await obtenerImagenesRecientes(coleccion);
      } else {
        imagenesData = await obtenerImagenesPorFecha(fechaConsulta, coleccion);
      }
      
      if (imagenesData.length === 0) {
        setError('No se encontraron imágenes para la fecha seleccionada.');
        setImagenes([]);
      } else {
        setImagenes(imagenesData);
        
        // Seleccionar la primera imagen por defecto
        if (imagenesData.length > 0) {
          setImagenSeleccionada(imagenesData[0]);
        }
      }
    } catch (error) {
      setError(`Error al obtener imágenes: ${error.message}`);
      setImagenes([]);
    } finally {
      setCargando(false);
    }
  }
  
  // Manejar el envío del formulario
  function manejarEnvio(e) {
    e.preventDefault();
    
    if (tipoConsulta === 'latest') {
      cargarImagenes('latest');
    } else {
      if (!fecha) {
        setError('Por favor, selecciona una fecha.');
        return;
      }
      
      cargarImagenes('date', fecha);
    }
  }

  return (
    <section className="demo-section">
      <h2>Explorador de Imágenes EPIC de la Tierra</h2>
      <p>Explora imágenes diarias de la Tierra completa tomadas por la cámara EPIC a bordo del satélite DSCOVR situado en el punto Lagrangiano L1.</p>
      

      
      <form onSubmit={manejarEnvio}>
        <div className="form-group">
          <label htmlFor="collection">Colección de Imágenes:</label>
          <select 
            id="collection" 
            value={coleccion} 
            onChange={(e) => setColeccion(e.target.value)}
          >
            <option value="natural">Natural (Color visible)</option>
            <option value="enhanced">Mejorada (Procesada)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="query-type">Tipo de Búsqueda:</label>
          <select 
            id="query-type" 
            value={tipoConsulta} 
            onChange={(e) => setTipoConsulta(e.target.value)}
          >
            <option value="latest">Imágenes más recientes</option>
            <option value="date">Por fecha específica</option>
          </select>
        </div>
        
        {tipoConsulta === 'date' && (
          <div className="form-group">
            <label htmlFor="date">Seleccionar Fecha:</label>
            {cargandoFechas ? (
              <div className="loading">Cargando fechas disponibles...</div>
            ) : fechasDisponibles.length > 0 ? (
              <select 
                id="date" 
                value={fecha} 
                onChange={(e) => setFecha(e.target.value)}
              >
                {fechasDisponibles.map(fechaDisp => (
                  <option key={fechaDisp} value={fechaDisp}>
                    {fechaDisp}
                  </option>
                ))}
              </select>
            ) : (
              <div className="error">No se pudieron cargar las fechas disponibles.</div>
            )}
          </div>
        )}
        
        <button type="submit">Buscar Imágenes</button>
      </form>
      
      {cargando && (
        <div className="loading">
          Cargando imágenes desde la API de NASA...
        </div>
      )}
      
      {error && (
        <div className="apod-info error">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Resultados de imágenes */}
      {imagenes.length > 0 && (
        <div className="epic-results">
          <h3>Imágenes encontradas: {imagenes.length}</h3>
          
          <div className="epic-viewer">
            <div className="epic-thumbnails">
              {imagenes.map((imagen, index) => (
                <div 
                  key={imagen.identifier}
                  className={`epic-thumbnail ${imagenSeleccionada && imagenSeleccionada.identifier === imagen.identifier ? 'selected' : ''}`}
                  onClick={() => setImagenSeleccionada(imagen)}
                >
                  <img 
                    src={imagen.url_imagen} 
                    alt={`Miniatura ${index + 1}`}
                    loading="lazy"
                  />
                  <small>{new Date(imagen.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</small>
                </div>
              ))}
            </div>
            
            {imagenSeleccionada && (
              <div className="epic-main-image">
                <div className="epic-image-container">
                  <img 
                    src={imagenSeleccionada.url_imagen} 
                    alt={imagenSeleccionada.caption || 'Imagen EPIC de la Tierra'} 
                    className="epic-img" 
                  />
                </div>
                
                <div className="epic-info">
                  <h3>{imagenSeleccionada.caption || 'Imagen EPIC de la Tierra'}</h3>
                  <p><strong>Fecha:</strong> {formatearFecha(imagenSeleccionada.date)}</p>
                  <p><strong>Identificador:</strong> {imagenSeleccionada.identifier}</p>
                  <p><strong>Versión:</strong> {coleccion === 'natural' ? 'Natural (Color visible)' : 'Mejorada (Procesada)'}</p>
                  
                  <div className="epic-coordinates">
                    <h4>Coordenadas del Centroide:</h4>
                    <p><strong>Latitud:</strong> {imagenSeleccionada.centroid_coordinates.lat.toFixed(2)}°</p>
                    <p><strong>Longitud:</strong> {imagenSeleccionada.centroid_coordinates.lon.toFixed(2)}°</p>
                  </div>
                  
                  <a 
                    href={imagenSeleccionada.url_imagen} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="epic-download-link"
                  >
                    Ver imagen en tamaño completo
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default ExploradorEPIC;