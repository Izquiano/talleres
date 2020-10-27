import React, { useState, useEffect } from "react";
import "./Coches.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const Coches = () => {
  const [state, setState] = useState({
    user: "",
    car: "",
    cars: [],
  });
  const [step, setStep] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/cars/${user.id}`)
      .then((response) => {
        console.log(response.data);
        setState({ ...state, cars: response.data, user: user.id });
        // setStep( prevState => prevState + 1)
      });
  }, []);

  const getdata = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`${process.env.REACT_APP_API_URL}/user/cars/${user.id}`)
      .then((response) => {
        // console.log(response.data);
        setState({ ...state, cars: response.data, user: user.id });
        setStep((prevState) => prevState + 1);
      });
  };

  const selectCar = (e) => {
    console.log(e.target);
    setState({ ...state, car: e.target.value });
  };

  return (
    <div className="cochesContainer">
      <h1>Coches</h1>

      <div className="listCochesContainer">
        {state.cars.map((car) => (
          <button onClick={selectCar} value={car.id} key={car.id}>
            Matrícula: <b>{car.registration}</b>
            
          </button>
        ))}
      </div>
      <div className="addCar">
        <Link to="/add-car">
          <img src="/icons/ic_mas.svg" alt="icono añadir coche" />
          Añadir coche
        </Link>
      </div>

      <button onClick={getdata}>Get Data</button>
    </div>
  );
};

export default Coches;
