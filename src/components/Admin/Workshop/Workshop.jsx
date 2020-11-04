import React, { useState, useEffect } from "react";
import "./Workshop.css";
import {
  workshops,
  eliminarParte,
  cerrarParte,
} from "../../../services/ApiClient";
import { FormatDate } from "../../../Helpers/Helpers";
import { Link, Redirect } from "react-router-dom";

const Workshop = ({ selectWorkshop, partes, setSelectWorkshop, setPartes }) => {
  const [state, setState] = useState([]);
  const [workshop, setWorkshop] = useState([{}]);
  const [actives, setActives] = useState(false);
  const [redirectTo, setRedirectTo] = useState(false);

  useEffect(() => {
    console.log();
    const partesList = partes.filter((el) => el.workshop.id === selectWorkshop);
    console.log(partesList[0]);
    setState(partesList);
  }, []);

  useEffect(() => {
    workshops().then((response) =>
      setWorkshop(response.filter((el) => el.id === selectWorkshop))
    );
  }, []);

  const handleClickActive = () => {
    setActives(!actives);
  };

  const handleClickDelete = (e) => {
    e.preventDefault();
    console.log(e.target);
    eliminarParte(e.target.id).then((response) => {
      console.log(e.target);
      setSelectWorkshop(null)
      setRedirectTo(true);
    });
  };
  const handleClickCloseParte = (e) => {
    e.preventDefault();
    console.log(e.target);
    cerrarParte(e.target.id, {active: false}).then((response) => {
      console.log(e.target);
      setSelectWorkshop(null)
      // setPartes([])
      setRedirectTo(true);
    });
  };

  if (redirectTo) {
    return <Redirect to="/dashboard" />;
  }

  return (
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
          <p>Servicios a realizar:</p>
          {el.services.map((el) => (
            <p key={el.id}>
              <b>{el.name}</b>
            </p>
          ))}
          <div style={el.active ? { display: "block" } : { display: "none" }}>
          <p> Acciones:</p>
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

          </div>
          
        </div>
      ))}
    </div>
  );
};

export default Workshop;
