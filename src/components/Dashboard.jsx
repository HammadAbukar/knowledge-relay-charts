import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";

import StockDetails from "./stocks/Details";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import DoughnutChart from "./charts/DoughnutChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

function Dashboard({ symbol }) {
  return (
    <div key={symbol}>
      <div className="flex justify-between mobile-column">
        <StockDetails symbol={symbol} />
        <DoughnutChart symbol={symbol} />
      </div>

      <LineChart symbol={symbol} />
      <BarChart symbol={symbol} />
    </div>
  );
}

export default Dashboard;
