import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Aggregates } from "../../services/polygon";

export default function BarChart({ symbol }) {
  const [data, setData] = useState(null);

  const options = {
    responsive: true,
    grouped: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Last week highest and lowest prices",
        position: "bottom",
      },
    },
  };

  useEffect(() => {
    Aggregates(symbol).then((response) => {
      if (response == undefined) return setData("Not Found");

      const labels = response.map((item) =>
        new Date(item.t).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      );

      const highestValues = response.map((item) => item.h);
      const lowestValues = response.map((item) => item.l);

      const formattedData = {
        labels,
        datasets: [
          {
            label: "Lowest",
            data: lowestValues,
            backgroundColor: "rgb(255, 205, 86)",
          },

          {
            label: "Highest",
            data: highestValues,
            borderColor: "#008000",
            backgroundColor: "#00800080",
          },
        ],
      };
      setData(formattedData);
    });
  }, []);

  if (!data) return <label>Loading...</label>;
  if (data === "Not Found") return <></>;

  return (
    <div className="mb-1">
      <Bar options={options} data={data} />
    </div>
  );
}
