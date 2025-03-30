import React, { useState } from 'react';
import Header from './components/common/Header';
import ApiSelector from './components/common/ApiSelector';

// Componentes APOD
import InformacionAPI from './components/apod/InformacionAPI';
import ExploradorAPOD from './components/apod/ExploradorAPOD';
import ImplementacionCodigo from './components/apod/ImplementacionCodigo';

// Componentes Rover
import InformacionRoverAPI from './components/rover/InformacionRoverAPI';
import ExploradorRover from './components/rover/ExploradorRover';
import ImplementacionCodigoRover from './components/rover/ImplementacionCodigoRover';

// Componentes EPIC
import InformacionEPICAPI from './components/epic/InformacionEPICAPI';
import ExploradorEPIC from './components/epic/ExploradorEPIC';
import ImplementacionCodigoEPIC from './components/epic/ImplementacionCodigoEPIC';

// Componentes NEO
import InformacionNEOAPI from './components/neo/InformacionNEOAPI';
import ExploradorNEO from './components/neo/ExploradorNEO';
import ImplementacionCodigoNEO from './components/neo/ImplementacionCodigoNEO';

// Componentes Exoplanet
import InformacionExoplanetAPI from './components/exoplanet/InformacionExoplanetAPI';
import ExploradorExoplanet from './components/exoplanet/ExploradorExoplanet';
import ImplementacionCodigoExoplanet from './components/exoplanet/ImplementacionCodigoExoplanet';

// Estilos
import './styles/App.css';
import './styles/apod.css';
import './styles/rover.css';
import './styles/epic.css';
import './styles/neo.css';
import './styles/exoplanet.css';

function App() {
  // Estado para controlar qué API se muestra
  const [apiActiva, setApiActiva] = useState('apod');

  return (
    <div className="App">
      <Header />
      <div className="container">
        <ApiSelector apiActiva={apiActiva} setApiActiva={setApiActiva} />
      </div>
      
      {apiActiva === 'apod' && (
        <>
          <div className="container">
            <InformacionAPI />
          </div>
          <div className="container">
            <ExploradorAPOD />
            <ImplementacionCodigo />
          </div>
        </>
      )}

      {apiActiva === 'rover' && (
        <>
          <div className="container">
            <InformacionRoverAPI />
          </div>
          <div className="container">
            <ExploradorRover />
            <ImplementacionCodigoRover />
          </div>
        </>
      )}

      {apiActiva === 'epic' && (
        <>
          <div className="container">
            <InformacionEPICAPI />
          </div>
          <div className="container">
            <ExploradorEPIC />
            <ImplementacionCodigoEPIC />
          </div>
        </>
      )}
      
      {apiActiva === 'neo' && (
        <>
          <div className="container">
            <InformacionNEOAPI />
          </div>
          <div className="container">
            <ExploradorNEO />
            <ImplementacionCodigoNEO />
          </div>
        </>
      )}
      
      {apiActiva === 'exoplanet' && (
        <>
          <div className="container">
            <InformacionExoplanetAPI />
          </div>
          <div className="container">
            <ExploradorExoplanet />
            <ImplementacionCodigoExoplanet />
          </div>
        </>
      )}
    </div>
  );
}

export default App;