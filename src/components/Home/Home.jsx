import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

const Home = () => {

  // const user = JSON.parse(localStorage.getItem("user"))
  
  return (
    <div className="homeContainer">
      
      <Logo size="small" />
      <h1>Inicio</h1>
      <div className="buttonsContainer">
        <Link to="dar-parte" className="button-home">
          <img src="/icons/ic_dar_parte.svg" alt=""/>
          <p>Dar un parte</p>
        </Link>
        <Link to="consultar-partes" className="button-home">
        <img src="/icons/ic_consultar_partes.svg" alt=""/>
          <p>Consultar partes</p>
        </Link>
        <Link to="coches" className="button-home">
        <img src="/icons/ic_coches.svg" alt=""/>
          <p>Coches</p>
        </Link>
        <Link to="user" className="button-home">
        <img src="/icons/ic_informacion_de_registro.svg" alt=""/>
          <p>Información de Registro</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
