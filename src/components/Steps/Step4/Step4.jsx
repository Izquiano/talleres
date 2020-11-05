import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./Step4.css";
import axios from "axios";
import { FormatDate } from "../../../Helpers/Helpers";

import { addParte } from "../../../services/ApiClient";

const Step4 = ({ user, car, services, date, workshop, damagedParts }) => {
  const [parte, setParte] = useState({});// eslint-disable-line
  const [fullUser, setFullUser] = useState({});
  const [fullCar, setFullCar] = useState({});
  const [servicesForCar, setServicesForCar] = useState([]);
  const [redirectTo, setRedirectTo] = useState(false); 
  // const authContext = useAuthContext();

  useEffect(() => {
    setParte({ user, car, date, workshop });
  }, []);// eslint-disable-line

  useEffect(() => {
    let servicesFiltered = [];
    axios.get(`${process.env.REACT_APP_API_URL}/services`).then((response) => {
      for (let i = 0; i < services.length; i++) {
        const serviceFiltered = response.data.filter(
          (el) => el.id === services[i]
        );
        servicesFiltered.push(serviceFiltered[0].name);
      }
    });

    setServicesForCar(servicesFiltered);
  }, []);// eslint-disable-line

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${user}`)
      .then((response) => {
        setFullUser(response.data);
      });
  }, []);// eslint-disable-line

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cars/${car}`)
      .then((response) => {
        setFullCar(response.data);
      });
  }, []);// eslint-disable-line

  const handleSubmit = (e) => {
    e.preventDefault();
    addParte({ date, user, car, services, workshop, damagedParts })
      .then((response) => {
        // authContext.login(response);
        
        setRedirectTo(true);
      })
      .catch((err) => console.log(err));
  };

  if (redirectTo) {
    return <Redirect to="/successfull" />;
  }
  return (
    <div className="resumenContainer">
      <h1>Datos del parte</h1>
      <div>
        <b>Taller</b>
      </div>
      <span>{workshop.name}</span>
      <div>
        <b>Usuario</b>
      </div>
      <span>{fullUser.name}</span>
      <div>
        <b>Vehículo</b>
      </div>
      <span>{fullCar.registration}</span>
    
      <div>
        {servicesForCar.length > 0 ? (<div><b>Servicios</b></div>): (null)}
        
      </div>
      {servicesForCar.map((el) => (
        <div key={el}>{el}</div>
      ))}
       <div>
       {damagedParts.length > 0 ? (<div><b>Partes Dañadas</b></div>): (null)}
        
      </div>
      {damagedParts.map((el) => (
        <div key={el}>{el}</div>
      ))}
      


      <div>
        <b>Fecha</b>
      </div>
      <span>{FormatDate(date)}</span>

      <button className="step" onClick={handleSubmit}>
        Confirmar
      </button>
    </div>
  );
};

export default Step4;
