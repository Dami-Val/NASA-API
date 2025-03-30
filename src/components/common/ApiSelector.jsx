import React from 'react';

function ApiSelector({ apiActiva, setApiActiva }) {
  // Map of icons for each API
  const apiIcons = {
    apod: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
      </svg>
    ),
    rover: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    epic: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    neo: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
      </svg>
    ),
    exoplanet: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="4"></circle>
        <line x1="21.17" y1="8" x2="12" y2="8"></line>
        <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
        <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
      </svg>
    )
  };

  return (
    <div className="api-selector-container">
      <h2>Selecciona una API para explorar</h2>
      <div className="api-selector">
        <button 
          className={apiActiva === 'apod' ? 'active' : ''} 
          onClick={() => setApiActiva('apod')}
        >
          {apiIcons.apod}
          <span>Explorador APOD</span>
        </button>
        <button 
          className={apiActiva === 'rover' ? 'active' : ''} 
          onClick={() => setApiActiva('rover')}
        >
          {apiIcons.rover}
          <span>Fotos Mars Rover</span>
        </button>
        <button 
          className={apiActiva === 'epic' ? 'active' : ''} 
          onClick={() => setApiActiva('epic')}
        >
          {apiIcons.epic}
          <span>Imágenes EPIC</span>
        </button>
        <button 
          className={apiActiva === 'neo' ? 'active' : ''} 
          onClick={() => setApiActiva('neo')}
        >
          {apiIcons.neo}
          <span>Objetos Cercanos</span>
        </button>
        <button 
          className={apiActiva === 'exoplanet' ? 'active' : ''} 
          onClick={() => setApiActiva('exoplanet')}
        >
          {apiIcons.exoplanet}
          <span>Exoplanetas</span>
        </button>
      </div>
    </div>
  );
}

export default ApiSelector;