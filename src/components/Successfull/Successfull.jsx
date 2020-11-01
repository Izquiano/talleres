import React from "react";
import { Link } from 'react-router-dom'
import './Successfull.css'
import Logo from "../Logo/Logo";

const Successfull = () => {
  return (
    <div className="successContainer">
       <Logo 
  size="small"
  />
  <img src="/icons/ic_Check.svg" alt="icon"/>
      <p>Datos cambiados con éxito</p>
     
      
      <Link to="/home">Continuar</Link>
    </div>
  );
};
export default Successfull;
