import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const Graph = ({ info }: any) => {
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
  return <Line data={data} options={options} />;
};

export default Graph;
