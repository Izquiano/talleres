import React, { useState, useEffect } from "react";
import "./DarParte.css";
import axios from "axios";
import Step0 from "../Steps/Step0/Step0";
import ChapaYPintura from "../ChapaYPintura/ChapaYPintura";
import Step1 from "../Steps/Step1/Step1";
import Step2 from "../Steps/Step2/Step2";
import Step3 from "../Steps/Step3/Step3";
import Step4 from "../Steps/Step4/Step4";
import Menu from "../Menu/Menu";

const DarParte = ({history}) => {
  const [state, setState] = useState({
    user: "",
    car: "",
    services: [],
    cars: [],
    motivo: "",
    workshop: "",
    damagedParts: [],
  });
  const [servicesList, setServicesList] = useState([]);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [day, setDay] = useState(undefined);

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
  }, []);// eslint-disable-line

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/services`)
      .then((response) => {
        setServicesList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);// eslint-disable-line

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
    if (state.services.includes(e.target.id)) {
      const servicesResult = state.services.filter((el) => el !== e.target.id);
      setState({ ...state, services: servicesResult });
    } else {
      // var joined = state.services.push(e.target.id);

      setState((prev) => {
        return {
          ...state,
          services: [...state.services, e.target.id],
        };
      });
    }
  };

  const handleClickDamagedParts = (e) => {
    let urlImage = e.target.attributes.src.nodeValue;
    const text = "_naranja";
    
    if (urlImage.includes(text)) {
      const newUrlImage = urlImage.replace(text, "");
      e.target.setAttribute("src", newUrlImage);
      const partsResult = state.damagedParts.filter(
        (el) => el !== e.target.dataset.part
      );
      setState((prev) => {
        return {
          ...state,
          damagedParts: [...partsResult],
        };
      });
    } else {
      const newUrlImage = [
        urlImage.slice(0, -4),
        text,
        urlImage.slice(-4),
      ].join("");
      e.target.setAttribute("src", newUrlImage);
      setState((prev) => {
        return {
          ...state,
          damagedParts: [...state.damagedParts, e.target.dataset.part],
        };
      });
    }
  };

  const handleChangeSelected = (selection) => {
    setState({ ...state, workshop: selection });
    setSelected(selection);
  };

  const handleDayClick = (date, { sunday, disabled }) => {
    if (disabled || sunday) {
      window.alert("Ese día no está disponible");
    } else {
      setDay(date);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    // Primera pantalla
    <>
  <Menu history={history} action={"action"} step={step} setStep={setStep}/>
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
      {step === 1 && state.motivo === "Chapa y pintura" ? (
        <ChapaYPintura
          state={state}
          handleClickDamagedParts={handleClickDamagedParts}
          nextStep={nextStep}
        />
      ) : null}

      {step === 1 && state.motivo === "Mecánica y mantenimiento" ? (
        <Step1
          state={state}
          servicesList={servicesList}
          handleChangeServices={handleChangeServices}
          nextStep={nextStep}
        />
      ) : null}

      {/* FIN segunda pantalla */}
      {/* Tercera pantalla  Maps*/}

      {step === 2 ? (
        <Step2
          nextStep={nextStep}
          handleChangeSelected={handleChangeSelected}
          selected={selected}
        />
      ) : null}

      {/* FIN tercera pantalla */}
      {/* Cuarta pantalla  Fechas*/}

      {step === 3 ? (
        <Step3 day={day} nextStep={nextStep} handleDayClick={handleDayClick} />
      ) : null}

      {/* FIN cuarta pantalla */}
      {/* Quinta pantalla  Resumen*/}

      {step === 4 ? (
        <Step4
          user={state.user}
          car={state.car}
          services={state.services}
          date={day}
          workshop={selected}
          damagedParts={state.damagedParts}
        />
      ) : null}
    </div>
    </>
  );
};

export default DarParte;
