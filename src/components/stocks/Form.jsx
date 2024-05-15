import { useState } from "react";
import searchImage from "../.././assets/icons/search.svg";

export function Input({ handleSubmit }) {
  const [symbol, setSymbol] = useState("");

  const handleInputChange = (event) => {
    setSymbol(event.target.value.toUpperCase().trim());
  };

  return (
    <form className="flex" onSubmit={(e) => handleSubmit(symbol, e)}>
      <input
        type="text"
        id="stockSymbol"
        value={symbol}
        onChange={handleInputChange}
        placeholder="Enter Stock Symbol (e.g., AAPL, MSFT)"
      />

      <button className="primary-button" type="submit">
        <img src={searchImage} alt="Search" />
      </button>
    </form>
  );
}
