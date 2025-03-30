import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ApiSelector from './components/common/ApiSelector';
import AnimationScript from './components/common/AnimationScript';

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

  // Effect para animar elementos al hacer scroll
  useEffect(() => {
    const revealer = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        } else {
          reveals[i].classList.remove('active');
        }
      }
    };
    
    window.addEventListener('scroll', revealer);
    
    // Trigger once on load
    revealer();
    
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', revealer);
    };
  }, [apiActiva]); // Re-run when active API changes

  return (
    <div className="App">
      <AnimationScript />
      <Header />
      <div className="container reveal">
        <ApiSelector apiActiva={apiActiva} setApiActiva={setApiActiva} />
      </div>
      
      {apiActiva === 'apod' && (
        <>
          <div className="container reveal">
            <InformacionAPI />
          </div>
          <div className="container reveal">
            <ExploradorAPOD />
            <ImplementacionCodigo />
          </div>
        </>
      )}

      {apiActiva === 'rover' && (
        <>
          <div className="container reveal">
            <InformacionRoverAPI />
          </div>
          <div className="container reveal">
            <ExploradorRover />
            <ImplementacionCodigoRover />
          </div>
        </>
      )}

      {apiActiva === 'epic' && (
        <>
          <div className="container reveal">
            <InformacionEPICAPI />
          </div>
          <div className="container reveal">
            <ExploradorEPIC />
            <ImplementacionCodigoEPIC />
          </div>
        </>
      )}
      
      {apiActiva === 'neo' && (
        <>
          <div className="container reveal">
            <InformacionNEOAPI />
          </div>
          <div className="container reveal">
            <ExploradorNEO />
            <ImplementacionCodigoNEO />
          </div>
        </>
      )}
      
      {apiActiva === 'exoplanet' && (
        <>
          <div className="container reveal">
            <InformacionExoplanetAPI />
          </div>
          <div className="container reveal">
            <ExploradorExoplanet />
            <ImplementacionCodigoExoplanet />
          </div>
        </>
      )}
      
      <Footer />
    </div>
  );
}

export default App;