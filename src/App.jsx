import Dashboard from "./components/Dashboard";
import { Input as StockInput } from "./components/stocks/Form";
import { useState } from "react";

import "./App.scss";

function App() {
  const [stockSymbol, setStockSymbol] = useState("AAPL");

  const handleSubmit = (symbol, event) => {
    event.preventDefault();
    if (symbol === "") return;
    setStockSymbol(symbol);
  };

  return (
    <>
      <div className="top-nav">
        <StockInput handleSubmit={handleSubmit} />
      </div>

      <Dashboard symbol={stockSymbol} />
    </>
  );
}

export default App;
