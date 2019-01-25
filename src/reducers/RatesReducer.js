import { RATES_ACTIONS } from "../actions/Rates";

export default function(state = [], action) {
  switch (action.type) {
    case RATES_ACTIONS.FETCH_RATES:
      return { ...state, ...action.payload };
    case RATES_ACTIONS.RATES_EXCHANGES:
      return { ...state, exchangesRates: action.payload };
    default:
      return state;
  }
}
