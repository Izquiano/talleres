import React, { useState, useEffect } from "react";
import "./DarParte.css";
import axios from "axios";
import Button from "../Button/Button";

const DarParte = () => {
  const [state, setState] = useState({
    user: "",
    car: "",
    cars: [],
    motivo: "",
  });
  const [step, setStep] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/cars/${user.id}`)
      .then((response) => {
        setState({ ...state, cars: response.data, user: user.id });
      });
  }, []);

  // useEffect(() => {
    
  //       setStep({ step: step +1 });
      
  // }, [setStep]);

  const handleChangeMatricula = (e) => {
    const { name, value } = e.target;
    setState((prev) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => {
      return {
        ...state,
        motivo: e.target.textContent,
      };
    });
  };

  const nextStep = () => {
    setStep(step +1)
  };

  return (
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
        className={
          state.motivo === "Mecánica y mantenimiento" ? "selected" : ""
        }
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
      {state.user && state.car && state.motivo ? 
        <button className="step" onClick={nextStep}>Continuar</button>
      : null}
    </div>
  );
};

export default DarParte;
