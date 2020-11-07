import React, { useState, useEffect } from "react";
import "./Workshop.css";
import {
  workshops,
  eliminarParte,
  cerrarParte,
  confirmParte
} from "../../../services/ApiClient";
import { FormatDate } from "../../../Helpers/Helpers";
import { Redirect } from "react-router-dom";
import Menu from '../../Menu/Menu'

const Workshop = ({ selectWorkshop, partes, setSelectWorkshop, history }) => {
  const [state, setState] = useState([]);
  const [workshop, setWorkshop] = useState([{}]);
  const [actives, setActives] = useState(false);
  const [redirectTo, setRedirectTo] = useState(false);

  useEffect(() => {
    const partesList = partes.filter((el) => el.workshop.id === selectWorkshop);
    
    setState(partesList);
  }, []);// eslint-disable-line

  useEffect(() => {
    workshops().then((response) =>
      setWorkshop(response.filter((el) => el.id === selectWorkshop))
    );
  }, []);// eslint-disable-line



  const handleClickActive = () => {
    setActives(!actives);
  };

  const handleClickDelete = (e) => {
    e.preventDefault();

    eliminarParte(e.target.id).then((response) => {
      setSelectWorkshop(null);
      setRedirectTo(true);
    });
  };
  const handleClickCloseParte = (e) => {
    e.preventDefault();

    cerrarParte(e.target.id, { active: false }).then((response) => {
      setSelectWorkshop(null);
      // setPartes([])
      setRedirectTo(true);
    });
  };

  const handleClickConfirm = (e) => {
    
    confirmParte(e.target.id).then((response) => {
      setSelectWorkshop(null);
      // setPartes([])
      setRedirectTo(true);

    })
  }

  if (redirectTo) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
    <Menu history={history}  step={0} />
    <div className="adminWorkshopContainer">
      <h1>Taller</h1>
      <h2>{workshop[0].name}</h2>
      <div className="checkActiveContainer">
        <span>Activos: </span>
        <div
          className={`checkActive ${actives ? "disabled" : "enabled"}`}
          onClick={handleClickActive}
        >
          <div></div>
        </div>
      </div>

      {state.map((el) => (
        <div
          className="card"
          key={el.id}
          style={
            actives === !el.active && !el.active
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <p>
            Activo:{" "}
            <b>
              {el.active ? <span className="active">Sí</span> : <span>No</span>}
            </b>
          </p>
          <p>
            Fecha: <b>{FormatDate(el.date)}</b>
          </p>
          <p>
            Usuario: <b>{el.user.name}</b>
          </p>
          <p>
            Email: <b>{el.user.email}</b>
          </p>
          <p>
            Coche:{" "}
            <b>
              {el.car.carBrand} - {el.car.model} - {el.car.year}
            </b>
          </p>
          <p>
            Matrícula: <b>{el.car.registration}</b>
          </p>
          <p>
            Nº Bastidor: <b>{el.car.frameNumber}</b>
          </p>
          
          {el.services.length > 0 ? <p>Servicios a realizar:</p> : null}
          {el.services.map((el) => (
            <p key={el.id}>
              <b>{el.name}</b>
            </p>
          ))}
          {el.damagedParts.length > 0 ? <p>Reparaciones de chapa y pintura:</p> : null}
          {el.damagedParts.map((el) => (
            <p key={el}>
              <b>{el}</b>
            </p>
          ))}
          <div style={el.active ? { display: "block" } : { display: "none" }}>
            <p>Acciones:</p>
            <div className="flex">
              <div
                id={el.id}
                onClick={handleClickCloseParte}
                className="cerrarParte"
              >
                Cerrar Parte
              </div>

              <div
                className="denegarParte"
                id={el.id}
                onClick={handleClickDelete}
              >
                Denegar Parte
              </div>
              
              

              
            </div>
            {!el.confirmation ? (
            <><p>Aún no está confirmada la reserva:</p> 
            <div
                className="confirmarParte"
                id={el.id}
                onClick={handleClickConfirm}
              >
                Confirmar Reserva
              </div></>): null}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Workshop;
