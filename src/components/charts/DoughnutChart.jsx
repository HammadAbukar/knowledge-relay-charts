import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Ticker } from "../../services/polygon.js";

export default function DoughnutChart({ symbol }) {
  const [data, setData] = useState(null);

  const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: "Market Cap and Shares Outstanding",
        position: "bottom",
      },
    },
  };

  useEffect(() => {
    Ticker(symbol).then((res) => {
      if (res === "Not Found") return setData("Not Found");

      const formattedData = {
        labels: ["Market Cap", "Shares Outstanding"],
        datasets: [
          {
            data: [res.market_cap, res.weighted_shares_outstanding],
            backgroundColor: ["rgb(255, 205, 86)", "rgb(54, 162, 235)"],
          },
        ],
      };
      setData(formattedData);
    });
  }, []);

  if (!data) return <label>Loading...</label>;
  if (data === "Not Found") return <></>;

  return (
    <div>
      <Doughnut options={options} data={data} />
    </div>
  );
}
