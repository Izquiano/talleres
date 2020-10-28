import React from "react";

const Step0 = ({ state, handleChangeMatricula, handleChange, nextStep }) => (
  <div className="darParteContainer">
    <h1>Dar un Parte</h1>
    <p>
      <b>Seleccione un coche</b>
    </p>
    <div className="selectContainer">
      <img src="/icons/ic_coche.svg" alt="" />
      <select onChange={handleChangeMatricula} name="car">
        <option value="">Elija un coche</option>

        {state.cars.map((car) => (
          <option value={car.id} key={car.id}>
            Matrícula: {car.registration}
          </option>
        ))}
      </select>
    </div>

    <p>
      <b>¿A qué se debe el parte?</b>
    </p>
    <div
      className={state.motivo === "Mecánica y mantenimiento" ? "selected" : ""}
    >
      <img src="/icons/ic_mecanica_y_mantenimiento.svg" alt="" />
      <div onClick={handleChange} name="motivo">
        Mecánica y mantenimiento
      </div>
    </div>
    <div className={state.motivo === "Chapa y pintura" ? "selected" : ""}>
      <img src="/icons/ic_chapa_y_pintura.svg" alt="" />
      <div onClick={handleChange} name="motivo">
        Chapa y pintura
      </div>
    </div>
    {state.user && state.car && state.motivo ? (
      <button className="step" onClick={nextStep}>
        Continuar
      </button>
    ) : null}
  </div>
);


export default Step0