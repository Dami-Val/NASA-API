import React from 'react';

function Header() {
  return (
    <header>
      <div className="header-content">
        <img 
          src="/NASA_LOGO.png" 
          alt="NASA Logo" 
          className="nasa-logo" 
          style={{ width: '300px', height: 'auto' }}
        />
        <h1>Explorador de APIs de NASA</h1>
        <p>Descubre el universo a través de los datos de la NASA. Explora imágenes astronómicas, fotos de Marte, asteroides cercanos a la Tierra, y mucho más.</p>
      </div>
    </header>
  );
}

export default Header;