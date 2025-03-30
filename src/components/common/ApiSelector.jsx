import React from 'react';

function ApiSelector({ apiActiva, setApiActiva }) {
  return (
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
      <button 
        className={apiActiva === 'epic' ? 'active' : ''} 
        onClick={() => setApiActiva('epic')}
      >
        Imágenes EPIC de la Tierra
      </button>
      <button 
        className={apiActiva === 'neo' ? 'active' : ''} 
        onClick={() => setApiActiva('neo')}
      >
        Objetos Cercanos a la Tierra
      </button>
      <button 
        className={apiActiva === 'exoplanet' ? 'active' : ''} 
        onClick={() => setApiActiva('exoplanet')}
      >
        Explorador de Exoplanetas
      </button>
    </div>
  );
}

export default ApiSelector;