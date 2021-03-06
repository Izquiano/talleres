import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { detalleParte } from "../../services/ApiClient";
import { FormatDate } from "../../Helpers/Helpers";
import "./DetalleParte.css";
import { deleteParte } from "../../services/ApiClient";
import { Redirect } from "react-router-dom";
import Menu from '../Menu/Menu'

const DetalleParte = (props) => {
  const [state, setState] = useState(null);
  const [redirectTo, setRedirectTo] = useState(false);

  const { parteId } = useAuthContext();// eslint-disable-line

  useEffect(() => {
    detalleParte(props.parteId).then((response) => {
      setState(response);
      
    });
  }, []);// eslint-disable-line

  const arrayUniqueServices = (array) => {
    return array
      .map((el) => el.category)
      .filter((value, index, self) => self.indexOf(value) === index);
  };

  const handleClick = (e) => {
    e.preventDefault();
    deleteParte(state.id)
      .then((response) => {
        // authContext.login(response);

        setRedirectTo(true);
      })
      .catch((err) => console.log(err));
  };

  if (!state) {
    return <div>Cargando...</div>;
  }
  if (redirectTo) {
    return <Redirect to="/home" />;
  }
  return (
    <>
    <Menu history={props.history}  step={0}/>
    <div className="detalleParteContainer">
      <h1>Detalle del parte</h1>
      <div className="cardParte">
        <p>
          Activo: <b>{state.active ? "Si" : "No"}</b>
        </p>
        <p>
          Vehículo: <b>{state.car.registration}</b>
        </p>
        <p>
          Motivo: 
          <b>{arrayUniqueServices(state.services)}</b>
          {state.damagedParts.length >0 ? <b>Chapa y pintura</b>: null}
        </p>
        <p>
          Servicios:{" "}
          {state.services.map((el) => (
            <span className="block" key={el.name}>
              <b>{el.name}</b>
            </span>
          ))}
          {state.damagedParts.map((el) => (
            <span className="block" key={el}>
              <b>{el}</b>
            </span>
          ))}
        </p>
       
        <p>Taller: {state.workshop.name}</p>
        <p>Fecha: {FormatDate(state.date)}</p>

        {/* <div className="delete" onClick={handleClick}>
          Borrar
        </div> */}
      </div>
    </div>
    </>
  );
};
export default DetalleParte;
