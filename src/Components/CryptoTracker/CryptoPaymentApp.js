import { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CryptoPaymentApp = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("/api/getCoinData")
      .then((res) => res.json())
      .then(({ data }) => setAllCoins(data));
  }, []);
  useEffect(() => {
    const coins = localStorage.getItem("coins");
    if (coins) {
      setCoins(JSON.parse(coins));
    }
  }, []);

  const addCoins = (e) => {
    const coinToAdd = allCoins.find(({ id }) => id === Number(e.target.value));
    const addedCoins = [...coins, coinToAdd];
    setCoins(addedCoins);
    localStorage.setItem("coins", JSON.stringify(addedCoins));
  };

  const removeCoin = (id) => {
    const newState = coins.filter((coin) => coin.id !== id);
    setCoins(newState);
    localStorage.setItem("coins", JSON.stringify(newState));
  };

  const removeButtonStyles = {
    marginBottom: 0,
    color: "#000",
    border: "2px solid #000",
  };

  return (
    <div>
      <label htmlFor="coin-search">Select Coin to track</label>
      <select name="coin-search" onChange={(e) => addCoins(e)}>
        {allCoins?.map(({ symbol, id }) => (
          <option value={id} key={id}>
            {symbol}
          </option>
        ))}
      </select>
      {coins.length === 0 && <h2>Nothing to show here</h2>}
      {coins.length !== 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Ticker</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Rank</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">%</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.map(({ name, symbol, cmc_rank, quote, id }) => (
                <TableRow key={id}>
                  <TableCell align="right">{symbol}</TableCell>
                  <TableCell align="right">{name}</TableCell>
                  <TableCell align="right">{cmc_rank}</TableCell>
                  <TableCell align="right">
                    {quote.USD.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {quote.USD.percent_change_24h.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <button
                      style={removeButtonStyles}
                      onClick={() => removeCoin(id)}
                    >
                      remove
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default CryptoPaymentApp;
