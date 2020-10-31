import React from 'react'

const Step1 = ({ state, servicesList, handleChangeServices, nextStep }) => (
  <div className="darParteContainer">
          <h1>Mecánica y mantenimiento</h1>
          <p>
            <b>Elija una o más opciones</b>
          </p>
          {servicesList.map((el) => (
            <div
              onClick={handleChangeServices}
              className={state.services.includes(el.id) ? "selected" : ""}
              key={el.id}
              
            >
              <img src={`/icons/ic_${el.name}.svg`} alt="icon" />
              <div id={el.id}>{el.name}</div>
            </div>
          ))}
          {state.services.length > 0 ? (
            <button className="step secondPage" onClick={nextStep}>
              Continuar
            </button>
          ) : null}
        </div>
)

export default Step1