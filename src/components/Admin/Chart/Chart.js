import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import { workshops } from "../../../services/ApiClient";

const Dankmemes = () => {
  const [chartData, setChartData] = useState({
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  const chart = () => {
    let empSal = [];
    let empAge = [];
    axios
      .get(`${process.env.REACT_APP_API_URL}/services-resume`)
      .then((res) => {
        // console.log(res.data);
        const workshops = res.data.map((el) => el.workshop.name);
        // console.log("Workshops: ", workshops);
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
        var uniqueName = workshops.filter(onlyUnique);
        // console.log(uniqueName);

        // const serviciosDados = res.data.map((el) => el.services);

        // console.log("Servicios dados: ", serviciosDados);
        // serviciosDados.filter((item) => {
        //   //  console.log(item.workshop.name())
        // });

        // const serviciosDadosAplanados = serviciosDados.flat();

        // console.log("Servicios dados aplanados: ", serviciosDadosAplanados);

        for (let i = 0; i < uniqueName.length; i++) {
          const dataForEachWorkshop = res.data.filter(
            (el) => el.workshop.name === uniqueName[i]
          );
          console.log(uniqueName[i], dataForEachWorkshop);
          empSal.push(dataForEachWorkshop.length);
          empAge.push(uniqueName[i]);
        }

        setChartData({
          labels: empAge,
          datasets: [
            {
              label: "Total de partes",
              data: empSal,
              backgroundColor: ["rgba(255, 121, 0, 0.4)"],
              borderWidth: 2,
              borderColor: ["rgb(255, 121, 0)"]
            },
          ],
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
    <div className="App">
      <div>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: false },
            scales: {
              yAxes: [
                {
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
        />
      </div>
    </div>
  );
};

export default Dankmemes;
