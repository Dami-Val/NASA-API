import React, { useState, useEffect } from 'react';

function Footer() {
  const [profileImage, setProfileImage] = useState('');
  
  useEffect(() => {
    // Obtener la imagen de perfil de GitHub
    fetch('https://api.github.com/users/Dami-Val')
      .then(response => response.json())
      .then(data => {
        setProfileImage(data.avatar_url);
      })
      .catch(error => {
        console.error('Error al obtener la imagen de perfil:', error);
        // Fallback a una URL directa en caso de error
        setProfileImage('https://github.com/Dami-Val.png');
      });
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="developer-info">
          <p>Desarrollado con ❤️ por Damian Valencia</p>
          <p>© {new Date().getFullYear()} - Todos los derechos reservados</p>
        </div>
        
        <div className="github-profile">
          {profileImage && (
            <img 
              src={profileImage} 
              alt="Damian Valencia" 
              className="github-avatar" 
            />
          )}
          <a 
            href="https://github.com/Dami-Val" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Sígueme en GitHub
          </a>
        </div>
        
        <div className="api-info">
          <p>Datos proporcionados por las APIs públicas de la NASA</p>
          <small>Este sitio no está afiliado oficialmente con la NASA</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;