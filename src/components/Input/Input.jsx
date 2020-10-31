import React from "react"
import "./Input.css"

const Input = (props) => {
  return (
        <div className="inputContainer">
        <input type={props.type} placeholder={props.placeholder} name={props.name} onChange={props.onChange} value={props.value}/>
        <span className="icon" onClick={props.onClick}><img src={`/icons/ic_${props.icon}.svg`} alt=""/></span>
        </div>
  );
}

export default Input;