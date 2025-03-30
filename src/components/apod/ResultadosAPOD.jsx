import React from 'react';
import TarjetaAPOD from './TarjetaAPOD';

function ResultadosAPOD({ resultados }) {
  if (!resultados || resultados.length === 0) {
    return null;
  }
  
  return (
    <div className="apod-results">
      {resultados.map((apod, index) => (
        <TarjetaAPOD key={`${apod.date}-${index}`} apod={apod} index={index} />
      ))}
    </div>
  );
}

export default ResultadosAPOD;