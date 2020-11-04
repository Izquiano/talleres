import React, { useState, useEffect } from "react";
import './ChapaYPintura.css'

const ChapaYPintura = () => {

  const [damagedParts, setDamagedParts] = useState ([])

  const handleClick = (e) => {
    let urlImage = e.target.attributes.src.nodeValue
    const text = "_naranja"
    if(urlImage.includes(text)){
      const newUrlImage = urlImage.replace(text, "");
      e.target.setAttribute("src", newUrlImage)
      const partsResult = damagedParts.filter(
        (el) => el !== e.target.dataset.part
      );
      setDamagedParts( partsResult );
    }else{
      const newUrlImage = [urlImage.slice(0, -4), text, urlImage.slice(-4)].join('');
      e.target.setAttribute("src", newUrlImage)
      setDamagedParts( [...damagedParts, e.target.dataset.part] )
    }
    console.log(e.target.dataset.part)
    

  }

  return (
    <div className="chapaYPinturaContainer">
    <h1>Chapa y pintura</h1>
    <p>Seleccione las partes dañadas de su coche</p>

    <div className="esquemaContainer">
      <div className="left">
        <div className="ruedaDI">
          <img src="/carIcons/ic_rueda.svg" className="" alt="" onClick={handleClick} data-part="Rueda delantera izquierda"/>
        </div>
        <div className="ruedaTI">
        <img src="/carIcons/ic_rueda.svg" alt="" onClick={handleClick} data-part="Rueda trasera izquierda"/>
        </div>
      </div>
      <div className="center">
        <div className="row one">
          
            <img src="/carIcons/ic_coche_1.svg" alt="" onClick={handleClick} data-part="Parachoques delantero izquierda"/>
            <img src="/carIcons/ic_coche_2.svg" alt="" onClick={handleClick} data-part="Parachoques delantero centro"/>
            <img src="/carIcons/ic_coche_3.svg" alt="" onClick={handleClick} data-part="Parachoques delantero derecha"/>
          
        </div>
        <div className="row two">
        <img src="/carIcons/ic_coche_4.svg" alt="" onClick={handleClick} data-part="Aleta izquierda"/>
            <img src="/carIcons/ic_coche_5.svg" alt="" />
            <img src="/carIcons/ic_coche_6.svg" alt="" onClick={handleClick} data-part="Aleta derecha"/>
        </div>
        <div className="row three">
        <img src="/carIcons/ic_coche_7.svg" alt="" onClick={handleClick} data-part="Puerta delantera izquierda"/>
            <img src="/carIcons/ic_coche_8.svg" alt="" />
            <img src="/carIcons/ic_coche_9.svg" alt="" onClick={handleClick} data-part="Puerta delantera derecha"/>
        </div>
        <div className="row four">
        <img src="/carIcons/ic_coche_10.svg" alt="" onClick={handleClick} data-part="Puerta trasera izquierda"/>
            <img src="/carIcons/ic_coche_11.svg" alt="" onClick={handleClick} data-part="Techo"/>
            <img src="/carIcons/ic_coche_12.svg" alt="" onClick={handleClick} data-part="Puerta trasera derecha"/>
        </div>
        <div className="row five">
        <img src="/carIcons/ic_coche_13.svg" alt="" onClick={handleClick} data-part="Parachoques trasero izquierda"/>
            <img src="/carIcons/ic_coche_14.svg" alt="" onClick={handleClick} data-part="Parachoques trasero centro"/>
            <img src="/carIcons/ic_coche_15.svg" alt="" onClick={handleClick} data-part="Parachoques trasero derecha"/>
        </div>
      </div>
      <div className="right">
        <div className="ruedaDD">
        <img src="/carIcons/ic_rueda.svg" alt="" onClick={handleClick}/>
        </div>
        <div className="ruedaTD">
        <img src="/carIcons/ic_rueda.svg" alt="" onClick={handleClick}/>
        </div>
      </div>
    </div>
    {damagedParts.length > 0 ? (
        <button className="step" >
          Continuar
        </button>
      ) : null}
  </div>
);
  

}


export default ChapaYPintura;
