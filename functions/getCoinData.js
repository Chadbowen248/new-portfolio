const fetch = require("node-fetch");

exports.handler = async function (_event, _context) {
  const url = process.env.REACT_APP_COINMARKETCAP_API_KEY;

  return fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=200&convert=USD&CMC_PRO_API_KEY=${url}`
  )
    .then((res) => res.json())
    .then((data) => {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    });
};
