import React, { useState, useEffect } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { workshops } from "../../../services/ApiClient";
import "./Chart.css";

const ChartServices = () => {
  // const [chartData, setChartData] = useState({});
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  const chart = () => {
    let numeroPartes = [];

    let todosLosServiciosNombres = [];

    axios
      .get(`${process.env.REACT_APP_API_URL}/services`)
      .then((res) => {
        todosLosServiciosNombres = res.data.map((el) => el.name);
      })
      .then(() => {
        var repetidos = {};
        axios
          .get(`${process.env.REACT_APP_API_URL}/services-resume`)
          .then((res) => {
            let todosLosServiciosHechos = res.data
              .map((el) => el.services)
              .flat()
              .map((el) => el.name);

            for (let i = 0; i < todosLosServiciosNombres.length; i++) {
              var array = todosLosServiciosHechos;
              console.log()

             const array2 = array.filter((v, i, a) => a.indexOf(v) === i)

              console.log("array2", array2)
              console.log("array", array)
              setLabels(array2);
              for (let i = 0; i < array.length; i++) {
                const NumeroDePartes = res.data
                  .map((el) => el.services)
                  .flat()
                  .filter((e) => e.name === array[i]);

                numeroPartes.push(NumeroDePartes.length);
              }
              setData(numeroPartes);
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className="App2">
      <div>
        <Bar
          type="horizontalBar"
          data={{
            labels: labels,

            datasets: [
              {
                label: "Total",
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(255, 121, 0, 0.4)",
                borderColor: "rgba(255, 121, 0, 1)", // The main line color
                borderCapStyle: "square",
                borderDash: [], // try [5, 15] for instance
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "black",
                pointBackgroundColor: "white",
                pointBorderWidth: 1,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: "yellow",
                pointHoverBorderColor: "brown",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                // notice the gap in the data and the spanGaps: true
                data: data,
              },
            ],
          }}
          options={{
            animateScale: true,
            responsive: true,
            legend: false,
            title: { text: "Servicios demandados", display: true },
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: true,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChartServices;
