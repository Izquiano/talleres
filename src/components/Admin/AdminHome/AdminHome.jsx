import React, { useState, useEffect } from "react";
import { workshops, listarPartes } from "../../../services/ApiClient";
import ChartPartes from "../Chart/ChartPartes";
import ChartServices from "../Chart/ChartServices";
import Workshop from "../Workshop/Workshop";
import Redirect from 'react-router-dom'

import "./AdminHome.css";

const AdminHome = () => {
  const [state, setState] = useState("");
  const [workshopsList, setWorkshopsList] = useState([]);
  const [partes, setPartes] = useState([]);
  const [selectWorkshop, setSelectWorkshop] = useState(null);

  useEffect(() => {
    workshops().then((response) => setWorkshopsList(response));
  }, []);

  useEffect(() => {
    listarPartes().then((response) => {
      setPartes(response);
    });
  }, [selectWorkshop]);
  // useEffect(() => {
  //   setSelectWorkshop(null)
  // }, []);

  const filterPartesPorWorkshop = (workshopId) => {
    let result = partes.filter((parte) => parte.workshop.id === workshopId);
    return result;
  };

  const handleclickSelectWorkshop = (e) => {
    setSelectWorkshop(e.target.parentNode.id);
  };

  if (selectWorkshop) {
    return <Workshop selectWorkshop={selectWorkshop} partes={partes} setSelectWorkshop={setSelectWorkshop} setPartes={setPartes}/>;
  }

  return (
    <div className="adminHomeContainer">
      <h1>Dashboard</h1>

      <div className="card">
        <h2>Total Partes</h2>
        <ChartPartes workshopsList={workshopsList} partes={partes} />
        {workshopsList.map((workshop) => (
          <div key={workshop.id} className="flex">
            <p>
              <span>
                {workshop.name}:{" "}
                <b>{filterPartesPorWorkshop(workshop.id).length}</b>
              </span>
            </p>

            <p>
              Activos:{" "}
              <b className="actives">
                {
                  filterPartesPorWorkshop(workshop.id).filter(
                    (el) => el.active === true
                  ).length
                }
              </b>
            </p>
            <p>
              Inactivos:{" "}
              <b>
                {
                  filterPartesPorWorkshop(workshop.id).filter(
                    (el) => el.active === false
                  ).length
                }
              </b>
            </p>
          </div>
        ))}
      </div>
      <div className="card">
        <h2>Talleres</h2>
        {workshopsList.map((el) => (
          <div className="tallerButton" id={el.id} key={el.id}>
            <b onClick={handleclickSelectWorkshop}>{el.name}</b>
          </div>
        ))}
      </div>
      <div className="card">
        <h2>Ranking de servicios</h2>
        <ChartServices workshopsList={workshopsList} partes={partes} />
      </div>
    </div>
  );
};

export default AdminHome;
