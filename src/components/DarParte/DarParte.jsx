import React, { useState, useEffect } from "react";
import "./DarParte.css";
import axios from "axios";
import Step0 from "../Steps/Step0/Step0";
import Step1 from "../Steps/Step1/Step1";
import Step2 from "../Steps/Step2/Step2";

const DarParte = () => {
  const [state, setState] = useState({
    user: "",
    car: "",
    services: [],
    cars: [],
    motivo: "",
  });
  const [servicesList, setServicesList] = useState([]);
  const [step, setStep] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/cars/${user.id}`)
      .then((response) => {
        setState({ ...state, cars: response.data, user: user.id });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/services`)
      .then((response) => {
        setServicesList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    setState((prev) => {
      return {
        ...state,
        motivo: e.target.textContent,
      };
    });
  };

  const handleChangeServices = (e) => {
    if (state.services.includes(e.target.textContent)) {
      const servicesResult = state.services.filter(
        (el) => el !== e.target.textContent
      );
      setState({ ...state, services: servicesResult });
    } else {
      var joined = state.services.concat(e.target.textContent);

      setState((prev) => {
        return {
          ...state,
          services: joined,
        };
      });
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    // Primera pantalla

    <div>
      {step === 0 ? (
        <Step0
          state={state}
          nextStep={nextStep}
          handleChangeMatricula={handleChangeMatricula}
          handleChange={handleChange}
        />
      ) : null}

      {/* FIN primera pantalla */}
      {/* Segunda pantalla */}

      {step === 1 ? (
        <Step1
          state={state}
          servicesList={servicesList}
          handleChangeServices={handleChangeServices}
          nextStep={nextStep}
        />
      ) : null}
      {step === 2 ? (
        <Step2 />
      ) : null}
    </div>
  );
};

export default DarParte;
