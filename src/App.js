import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setConins] = useState([]);
  const [selected, setSelected] = useState([]);
  const [dollar, setDollar] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=20")
      .then((response) => response.json())
      .then((json) => {
        setConins(json);
        setLoading(false);
      });
  }, []);
  const onSelectChange = (event) => {
    setSelected(event.target.selectedOptions[0].value.split(","));
  }
  const onInputChange = (event) => {
    setDollar(event.target.value);
  }
  return (
    <div>
      <h1>The Coins {loading ? "" : `(${coins.length})`} </h1>
      {loading ? 
        <strong>Loading...</strong> : 
        <select onChange={onSelectChange}>
          {coins.map((coin) => 
            <option key={coin.id} value={[coin.symbol,coin.quotes.USD.price]}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
            </option>
          )}
        </select>
      }<br/><br/>
      <label>$</label> <input placeholder="Write down $" onChange={onInputChange}/> 
      <p> = {selected.length === 0 ? null : `${dollar/selected[1]} (${selected[0]})`}</p>
      
    </div>
  );
}

export default App;
