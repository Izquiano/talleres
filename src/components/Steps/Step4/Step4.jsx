import React, { useState, useEffect } from "react";
import "./Step4.css";
import axios from "axios";


const Step4 = ({ user, car, services, date, workshop }) => {
  const [parte, setParte] = useState({});
  const [fullUser, setFullUser] = useState({});
  const [fullCar, setFullCar] = useState({});
  const [servicesForCar, setServicesForCar] = useState([]);

  useEffect(() => {
    setParte({ user, car, date, workshop });
  }, []);

  useEffect(() => {
    let servicesFiltered = [];
    axios.get(`${process.env.REACT_APP_API_URL}/services`)
    .then((response) => {
      for (let i = 0; i < services.length; i++) {
        const serviceFiltered = response.data.filter(
          (el) => el.id === services[i]
        );
        servicesFiltered.push(serviceFiltered[0].name);
      }
      console.log(servicesFiltered);
    });

    setServicesForCar(servicesFiltered);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${user}`)
      .then((response) => {
        setFullUser(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cars/${car}`)
      .then((response) => {
        setFullCar(response.data);
        console.log(response.data);
      });
  }, []);

  const handleSubmit = (e) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/services-resume`, {
        date: date,
        user: user,
        car: car,
        services: services,
      })
      .then((response) => {
        console.log(response);
        window.location.assign('/confirmation')
      })
      
      .catch((err) => console.log(err));
  };

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
        <b>Servicios</b>
      </div>
      {servicesForCar.map((el) => (
        <div key={el}>{el}</div>
      ))}
      <div>
        <b>Fecha</b>
      </div>
      <span>date: {JSON.stringify(date)}</span>

      <button className="step" onClick={handleSubmit}>
        Confirmar
      </button>
    </div>
  );
};

export default Step4;
