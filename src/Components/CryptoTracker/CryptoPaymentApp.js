// import { useState, useEffect } from "react";

const CryptoPaymentApp = () => {
//   const [data, setData] = useState([]);


  return (
    <div>
      <label htmlFor="coin-search">Select Coin</label>
      <select>
        <option>You must choose</option>
        {/* {data.map((coin) => (
          <option>{coin.symbol}</option>
        ))} */}
      </select>
    </div>
  );
};

export default CryptoPaymentApp;
