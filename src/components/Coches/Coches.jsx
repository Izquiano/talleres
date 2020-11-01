import React, { useState, useEffect } from "react";
import "./Coches.css";
import axios from "axios";
import { Link } from "react-router-dom";
import EditCar from "../EditCar/EditCar";

const Coches = () => {
  const [state, setState] = useState({
    user: "",
    car: "",
    cars: [],
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/cars/${user.id}`)
      .then((response) => {
        setState({ ...state, cars: response.data, user: user.id });
      });
  }, []);

  const getdata = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`${process.env.REACT_APP_API_URL}/user/cars/${user.id}`)
      .then((response) => {
        setState({ ...state, cars: response.data, user: user.id });
      });
  };

  const selectCar = (e) => {
   
    const selectedCar = state.cars.filter((el) => el.id === e.target.id);
    setState({ ...state, car: selectedCar[0] });
  };

  return (
    <div>
      {state.car.length < 1 ? (
        <div className="cochesContainer">
          <h1>Coches</h1>

          <div className="listCochesContainer">
            {state.cars.map((car) => (
              <button key={car.id}>
                <p onClick={selectCar} id={car.id}>
                  Matrícula: <b>{car.registration}</b>
                </p>
              </button>
            ))}
          </div>
          <div className="addCar">
            <Link to="/add-car">
              <img src="/icons/ic_mas.svg" alt="icono añadir coche" />
              <b>Añadir coche</b> 
            </Link>
          </div>
        </div>
      ) : (
        <EditCar
          car={state.car}
          // carBrand={}
          // model={}
          // year={}
          // registration={}
          // frameNumber={}
        />
      )}
    </div>
  );
};

export default Coches;
