import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import RatesReducer from "./reducers/RatesReducer";
import "semantic-ui-css/semantic.min.css";

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      combineReducers({
        RatesReducer
      })
    )}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
