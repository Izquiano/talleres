import React, { useEffect} from "react";
import './ChapaYPintura.css'

const ChapaYPintura = ({ state, handleClickDamagedParts, nextStep }) => {

  

    useEffect(() => {
      const imgs = Array.from(document.getElementsByTagName("img"))
   
     
      imgs.map(el => {
        let urlImage = el.attributes.src.nodeValue;
        const text = "_naranja";
          if(state.damagedParts.includes(el.getAttribute('data-part'))){
            const newUrlImage = [
              urlImage.slice(0, -4),
              text,
              urlImage.slice(-4),
            ].join("");
            el.setAttribute("src", newUrlImage);

       }
      })
      

    }, [])// eslint-disable-line


  return (
    <div className="chapaYPinturaContainer">
    <h1>Chapa y pintura</h1>
    <p>Seleccione las partes dañadas de su coche</p>

    <div className="esquemaContainer">
      <div className="left">
        <div className="ruedaDI">
          <img src="/carIcons/ic_rueda.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Rueda delantera izquierda"/>
        </div>
        <div className="ruedaTI">
        <img src="/carIcons/ic_rueda.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Rueda trasera izquierda"/>
        </div>
      </div>
      <div className="center">
        <div className="row one">
          
            <img src="/carIcons/ic_coche_1.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Parachoques delantero izquierda"/>
            <img src="/carIcons/ic_coche_2.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Parachoques delantero centro"/>
            <img src="/carIcons/ic_coche_3.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Parachoques delantero derecha"/>
          
        </div>
        <div className="row two">
        <img src="/carIcons/ic_coche_4.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Aleta izquierda"/>
            <img src="/carIcons/ic_coche_5.svg" alt="icon" />
            <img src="/carIcons/ic_coche_6.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Aleta derecha"/>
        </div>
        <div className="row three">
        <img src="/carIcons/ic_coche_7.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Puerta delantera izquierda"/>
            <img src="/carIcons/ic_coche_8.svg" alt="icon" />
            <img src="/carIcons/ic_coche_9.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Puerta delantera derecha"/>
        </div>
        <div className="row four">
        <img src="/carIcons/ic_coche_10.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Puerta trasera izquierda"/>
            <img src="/carIcons/ic_coche_11.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Techo"/>
            <img src="/carIcons/ic_coche_12.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Puerta trasera derecha"/>
        </div>
        <div className="row five">
        <img src="/carIcons/ic_coche_13.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Parachoques trasero izquierda"/>
            <img src="/carIcons/ic_coche_14.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Parachoques trasero centro"/>
            <img src="/carIcons/ic_coche_15.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Parachoques trasero derecha"/>
        </div>
      </div>
      <div className="right">
        <div className="ruedaDD">
        <img src="/carIcons/ic_rueda.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Rueda delantera derecha"/>
        </div>
        <div className="ruedaTD">
        <img src="/carIcons/ic_rueda.svg" alt="icon" onClick={handleClickDamagedParts} data-part="Rueda trasera derecha"/>
        </div>
      </div>
    </div>
    {state.damagedParts.length > 0 ? (
        <button className="step" onClick={nextStep}>
          Continuar
        </button>
      ) : null}
  </div>
);
  

}


export default ChapaYPintura;
