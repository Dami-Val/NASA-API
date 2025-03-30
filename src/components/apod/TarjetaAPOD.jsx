import React from 'react';

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

export default TarjetaAPOD;