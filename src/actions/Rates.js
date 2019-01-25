import axios from "axios";
import { RATES_EXCHANGES_API, currenciesAvailable } from "../config";

export const RATES_ACTIONS = {
  FETCH_RATES: "FETCH_RATES",
  RATES_EXCHANGES: "RATES_EXCHANGES"
};

export const fetchRates = choosenCurrecies => dispatch => {
  const url = `${RATES_EXCHANGES_API}`;

  const promises = [];
  currenciesAvailable.forEach(currency => {
    promises.push(axios.get(`${url}${currency}`));
  });

  Promise.all(promises).then(data => {
    let returnObj = {};
    data.forEach(item => {
      returnObj = { ...returnObj, [item.data.base]: item.data.rates };
    });

    dispatch({
      type: RATES_ACTIONS.FETCH_RATES,
      payload: returnObj
    });

    getRatesExchanges(choosenCurrecies, returnObj)(dispatch);
  });
};

export const getRatesExchanges = (
  choosenCurrecies,
  ratesObject
) => dispatch => {
  const firstCurrency = choosenCurrecies[0];
  const secondCurrency = choosenCurrecies[1];

  let exchangeValues = [1, 1];
  if (Object.keys(ratesObject).length) {
    exchangeValues = [
      ratesObject[firstCurrency][secondCurrency],
      ratesObject[secondCurrency][firstCurrency]
    ];
  }

  dispatch({
    type: RATES_ACTIONS.RATES_EXCHANGES,
    payload: exchangeValues
  });
};
