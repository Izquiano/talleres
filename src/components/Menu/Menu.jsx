import React, { useState } from "react";
import { Link } from 'react-router-dom'
import "./Menu.css";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen(!open);
  };

  return (
    <div >
      <div className="menuClosed">
        <img src="/icons/ic_Back_arrow.svg" alt="" />
        <div onClick={handleClick}>
          <img className="menu" src="/icons/ic_Menu_close.svg" alt="" />
        </div>
      </div>
      <div>
        {
          open ? (
          <ul className="menu">
            <li><Link onClick={handleClick} to="/home"><b>Home</b></Link></li>
            <li><Link onClick={handleClick} to="/dar-parte">Dar Parte</Link></li>
            <li><Link onClick={handleClick} to="/coches">Coches</Link></li>
            <li><Link onClick={handleClick} to="/consultar-partes">Consultar partes</Link></li>
            <li><Link onClick={handleClick} to="/user">Información de registro</Link></li>
            <li className="dashboard"><Link onClick={handleClick} to="/dashboard"><b>Dashboard</b></Link></li>
          </ul>): null
          
        }
        
      </div>
    </div>
  );
};

export default Menu;
