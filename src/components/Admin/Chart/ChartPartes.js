import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";


const ChartPartes = () => {
  const [chartData, setChartData] = useState({});
  const [labels, setLabels] = useState([]);// eslint-disable-line
  const [data, setData] = useState([]);// eslint-disable-line

  const chart = () => {
    let numeroPartes = [];
    let nombresTalleres = [];
    axios
      .get(`${process.env.REACT_APP_API_URL}/services-resume`)
      .then((res) => {
        const workshops = res.data.map((el) => el.workshop.name);

        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
        var uniqueName = workshops.filter(onlyUnique);

        for (let i = 0; i < uniqueName.length; i++) {
          const dataForEachWorkshop = res.data.filter(
            (el) => el.workshop.name === uniqueName[i]
          );

          numeroPartes.push(dataForEachWorkshop.length);
          nombresTalleres.push(uniqueName[i]);
        }

        setChartData({
          labels: nombresTalleres,
          datasets: [
            {
              label: "Total de partes",
              data: numeroPartes,
              backgroundColor: [
                "rgba(255, 121, 0, 0.7)",
                "rgba(255, 121, 0, 0.4)",
              ],
              borderWidth: 2,
              borderColor: ["rgb(255, 121, 0)", "rgba(255, 121, 0, 0.5)"],
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
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            legend: false,
            title: { text: "THICCNESS SCALE", display: false },
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

export default ChartPartes;
