import React, { useState, useEffect } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { workshops } from "../../../services/ApiClient";
import "./Chart.css";

const ChartPartes = () => {
  const [chartData, setChartData] = useState({});
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  const chart = () => {
    let numeroPartes = [];
    let nombresTalleres = [];
    let nombresServicios = [];
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

              array.forEach(function (numero) {
                repetidos[numero] = (repetidos[numero] || 0) + 1;
              });

             
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
        {/* <Line
          data={{
            labels: labels,
            datasets: [{
                label: "Stock A",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(225,0,0,0.4)",
                borderColor: "red", // The main line color
                borderCapStyle: 'square',
                borderDash: [], // try [5, 15] for instance
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
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
                data: chartData[1],
                spanGaps: true,
              }, {
                label: "Stock B",
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(167,105,0,0.4)",
                borderColor: "rgb(167, 105, 0)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "white",
                pointBackgroundColor: "black",
                pointBorderWidth: 1,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: "brown",
                pointHoverBorderColor: "yellow",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                // notice the gap in the data and the spanGaps: false
                data: chartData[1],
                spanGaps: false,
              }
          
            ]
          }}
          options={{
            responsive: true,
            legend: false,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  display: false,
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
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
        /> */}
      </div>
    </div>
  );
};

export default ChartPartes;
