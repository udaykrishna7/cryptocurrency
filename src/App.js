import axios from "axios";
import React, {
  useState,
  useEffect
} from "react";
import Coin from "./Coin";
import './App.css';

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false


function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )


  return ( 
  <div className = "coin-app" >
    <div className = "coin-search">
      <h1 className="coin-text">Crypto-Market</h1>
      <form>
        <input type="text" className="coin-input" placeholder="Search a currency" onChange={handleChange} />
      </form>
    </div>
    {filteredCoins.map(coin =>{
      return (
        <Coin 
        key={coin.id} 
        name={coin.name} 
        image={coin.image} 
        symbol={coin.symbol} 
        volume={coin.total_volume} 
        price={coin.current_price}
        priceChange={coin.price_change_percentage_24h}
        marketcap={coin.market_cap}
         />
      );
    })}

  </div>
  );
}

export default App;