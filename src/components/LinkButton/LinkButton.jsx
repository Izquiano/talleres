import React from 'react';
import './LinkButton.css'



const LinkButton = (props) => {
  
  return (
  <a className="linkButton" href={props.href}>{props.icon && <img src={`/icons/ic_${props.icon}.svg`} alt={`icono ${props.icon}`}/>} <span>{props.text}</span></a>
  );
};

export default LinkButton;