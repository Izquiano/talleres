import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { consultarPartes } from "../../services/ApiClient";
import "./ConsultarPartes.css";
import DetalleParte from "../DetalleParte/DetalleParte";
import { FormatDate } from "../../Helpers/Helpers";

const ConsultarPartes = () => {
  const [partes, setPartes] = useState(null);
  const [parteId, setParteId] = useState(null);
  const [actives, setActives] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    consultarPartes(user.id).then((response) => {
      setPartes(response);
      
    });
  }, []);

  const handleClick = (e) => {
    setParteId(e.target.parentNode.parentNode.id);
  };

  const handleClickActive = () => {
    setActives(!actives);
  };

  // const arrayUniqueWorkshop = (array) => {
    
  //   return array
  //     .map((el) => el.workshop.name)
  //     .filter((value, index, self) => self.indexOf(value) === index);
  // };

  const arrayUniqueServices = (array) => {
    return array
      .map((el) => el.category)
      .filter((value, index, self) => self.indexOf(value) === index);
  };

  if (partes) {
    if (parteId) {
      return <DetalleParte parteId={parteId} setParteId={setParteId}/>;
    } else {
      return (
        <div className="consultarPartesContainer">
          <h1>Consultar partes</h1>
          <div className="checkActiveContainer">
            <span>Activos: </span>
            <div className={`checkActive ${actives ? "disabled": "enabled"}`} onClick={handleClickActive}><div></div></div>
          </div>

          {partes.map((el) => (
            <div
              id={el.id}
              key={el.id}
              onClick={handleClick}
              style={
                actives === !el.active && !el.active
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              <div className="cardParte">
                <div>
                  Activo: <b>{el.active ? "Si" : "No"}</b>
                </div>
                <div>
                  Vehículo: <b>{el.car.registration}</b>
                </div>
                <div>
                  Motivo:{" "}
                  {arrayUniqueServices(el.services).map((el) => (
                    <span key={el}>
                      <b>{el}</b>
                    </span>
                  ))}
                </div>
                <div>
                  Taller: {el.workshop.name} 
                </div>

                <div>Fecha: {FormatDate(el.date)}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  } else {
    return "No hay partes";
  }
};

export default ConsultarPartes;
