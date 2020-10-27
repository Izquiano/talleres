import React from 'react';
import './Button.css'



const Button = (props) => {
  
  return (
    <div className="buttonContainer">
      <button type={props.type}>{props.text}</button>
    </div>
  
  );
};

export default Button;