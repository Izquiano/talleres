import React, { useState, useEffect } from "react";
import "./AddCar.css";
import axios from "axios";
import Button from "../Button/Button";
import Input from "../Input/Input";

const AddCar = () => {
  const [state, setState] = useState({
    user: "",
    carBrand: "",
    model: "",
    year: "",
    registration: "",
    frameNumber: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setState({ ...state, user: user.id });
  }, []);

  const sendData = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    setState({ ...state, user: user.id });

    axios
      .post(`${process.env.REACT_APP_API_URL}/cars`, state)
      .then((response) => {
        console.log(response.data);
        window.location.assign("/coches");
      });
  };

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
    <div className="addCochesContainer">
      <h1>Añadir Coche</h1>
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
  );
};

export default AddCar;
