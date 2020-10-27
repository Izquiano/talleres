import React from 'react';
import './Logo.css'



const Logo = (props) => {
  
  return (
    <div className={`logo ${ props.size }`}>
      <div className={`app ${ props.size }`}>APP</div>
      <div className={`talleres ${ props.size }`}>TALLERES</div>
      <div className={`slogan ${ props.size }`}>AUTOMOCIÓN</div>
    </div>
  );
};

export default Logo;