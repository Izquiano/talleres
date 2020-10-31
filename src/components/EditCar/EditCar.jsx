import React, { useState, useEffect } from "react";
// import "./EditCar.css";

import Button from "../Button/Button";
import Input from "../Input/Input";
import { useAuthContext } from "../../contexts/AuthContext"; 
import { editCar } from "../../services/ApiClient";

const EditCar = (props) => {
  const [state, setState] = useState({
    carBrand: "",
    model: "",
    year: "",
    registration: "",
    frameNumber: "",
  });

  const [error, setError] = useState()
  const authContext = useAuthContext();
  

  useEffect(() => {
    setState(props.car);
  }, []);





  const sendData = (e) => {
    e.preventDefault();
    editCar({
        carBrand: state.carBrand,
        model: state.model,
        year: state.year,
        registration: state.registration,
        frameNumber: state.frameNumber,
        user: state.user,
        id: state.id
      }).then((response) => {
      // authContext.editCar(response);
      console.log(response);
      window.location.assign("/coches");
    });
  };


  //ORIGINAL
  // const sendData = (e) => {
  //   e.preventDefault();
  //   console.log(state);
  //   axios
  //     .patch(`${process.env.REACT_APP_API_URL}/cars/${state.id}`, {
  //       carBrand: state.carBrand,
  //       model: state.model,
  //       year: state.year,
  //       registration: state.registration,
  //       frameNumber: state.frameNumber,
  //       user: state.user,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => setError(err.message));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  return (
    <div>
      {
        error ? (<div>{error}</div>) : null
      }
      {state !== null ? (
        <div className="editCocheContainer">
          <h1>Editar Coche</h1>
          <form onSubmit={sendData}>
            <Input
              type="text"
              name="carBrand"
              placeholder="Marca del coche"
              onChange={handleChange}
              value={state.carBrand}
            />
            <Input
              type="text"
              name="model"
              placeholder="Modelo"
              onChange={handleChange}
              value={state.model}
            />
            <Input
              type="text"
              name="year"
              placeholder="Año"
              onChange={handleChange}
              value={state.year}
            />
            <Input
              type="text"
              name="registration"
              placeholder="Matrícula"
              onChange={handleChange}
              value={state.registration}
            />
            <Input
              type="text"
              name="frameNumber"
              placeholder="Nº de Bastidor"
              onChange={handleChange}
              value={state.frameNumber}
            />

            <Button type="submit" text="Enviar" />
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditCar;
