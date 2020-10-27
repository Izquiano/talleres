import React from 'react';
import './Splash.css'
import Logo from '../Logo/Logo'
import LinkButton from '../LinkButton/LinkButton'


const Home = () => {
  
  return (
    <div className="splashContainer">
      <Logo size="big"/>
      <p>Bienvenidos a la aplicación de reservas para la reparación de su vehículo</p>
      < LinkButton href="/login" text="Continuar"/>
    </div>
  );
};

export default Home;