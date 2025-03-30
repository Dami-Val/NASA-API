import React, { useState, useEffect } from 'react';
import { obtenerFotosRover, obtenerManifiestoRover, camarasPorRover, API_KEY_VALUE } from '../../services/roverService';

function ExploradorRover() {
  const API_KEY = API_KEY_VALUE;
  
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
  
  // Cargar manifiesto del rover al cambiar de rover
  useEffect(() => {
    cargarManifiestoRover();
  }, [rover]);
  
  // Función para cargar el manifiesto del rover
  async function cargarManifiestoRover() {
    setCargandoManifiesto(true);
    setError(null);
    
    try {
      const manifiestoData = await obtenerManifiestoRover(rover);
      setManifiestoRover(manifiestoData);
      
      // Establecer sol predeterminado a un valor válido
      if (manifiestoData?.max_sol && sol > manifiestoData.max_sol) {
        setSol(Math.floor(manifiestoData.max_sol / 2)); // Un sol intermedio
      }
    } catch (error) {
      setError(`Error al obtener manifiesto: ${error.message}`);
    } finally {
      setCargandoManifiesto(false);
    }
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
      const fotosFetcheadas = await obtenerFotosRover(rover, params);
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

export default ExploradorRover;