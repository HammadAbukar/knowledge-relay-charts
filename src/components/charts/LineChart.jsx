import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Aggregates } from "../../services/polygon";

export default function LineChart({ symbol }) {
  const [data, setData] = useState(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Last week opening and closing prices",
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

      const openingValues = response.map((item) => item.o);
      const closingValues = response.map((item) => item.c);

      const formattedData = {
        labels,
        datasets: [
          {
            fill: true,
            label: "Closing",
            data: closingValues,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
          {
            label: "Opening",
            data: openingValues,
            borderColor: "rgb(255, 205, 86)",
            backgroundColor: "rgba(255, 205, 86, 0.5)",
          },
        ],
      };
      setData(formattedData);
    });
  }, []);

  if (!data) return <label>Loading...</label>;
  if (data === "Not Found") return <></>;

  return (
    <div className="mb-2">
      <Line options={options} data={data} />
    </div>
  );
}
