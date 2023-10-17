import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import React from "react";

const Graph = ({ info }: any) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    info.length > 0 ? setLoading(false) : setLoading(true);
  }, [info]);
  Chart.register(...registerables);
  const options = {
    scales: {
      x: {
        display: false,
      },
    },
  };
  const data = {
    labels: info,
    datasets: [
      {
        label: "График цен",
        data: info,
        fill: false,
        borderColor: "rgb(75,192,192,0.4)",
        backgroundColor: "rgb(75,192,192,1)",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };
  return (
    <>{loading ? <h1>"Подождите, идет загрузка!"</h1> : <Line data={data} options={options} />}</>
  );
};

export default Graph;
