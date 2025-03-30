import React from 'react';
import TarjetaAPOD from './TarjetaAPOD';

function ResultadosAPOD({ resultados }) {
  if (!resultados || resultados.length === 0) {
    return null;
  }
  
  return (
    <div className="apod-results">
      <h3 className="results-title">
        Resultados encontrados: {resultados.length}
      </h3>
      
      <div className="apod-results-grid">
        {resultados.map((apod, index) => (
          <div 
            className="apod-result-item reveal" 
            key={`${apod.date}-${index}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <TarjetaAPOD apod={apod} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultadosAPOD;