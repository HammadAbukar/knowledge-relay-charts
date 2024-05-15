import { useEffect, useState } from "react";
import { Ticker } from "../../services/polygon.js";

export default function StockDetails({ symbol }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    Ticker(symbol).then((results) => {
      setData(results);
    });
  }, []);

  if (!data) return <label>Loading...</label>;
  if (data === "Not Found") return <label>Stock Not Found</label>;

  return (
    <div className="stock-details">
      <p>
        <b>Ticker:</b> {data.ticker}
      </p>

      <p>
        <b>Name:</b> {data.name}
      </p>

      <p>
        <b>Market:</b> {data.market}
      </p>

      <p>
        <b>Currency Name:</b> {data.currency_name}
      </p>

      <p>
        <b>Total Employees:</b> {data.total_employees}
      </p>

      <p>
        <b>Shares Outstanding:</b> {data.weighted_shares_outstanding}
      </p>

      <p>
        <b>Market Cap:</b> {data.market_cap}
      </p>
    </div>
  );
}
