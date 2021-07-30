// const fetch = require('fetch');

exports.handler = async function(event, context) {
    const url = process.env.REACT_APP_COINMARKETCAP_API_KEY;

    const data = fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=200&convert=USD&CMC_PRO_API_KEY=${url}`
      ).then(res => res.json())
    return {
        statusCode: 200,
        body: data
    };
}