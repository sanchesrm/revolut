import Adapter from "enzyme-adapter-react-16";
import React from "react";
import toJson from "enzyme-to-json";
import { configure, shallow } from "enzyme";
import RatesReducer from "./RatesReducer";
import { RATES_ACTIONS } from "../actions/Rates";

describe("Login Component", () => {
  beforeEach(() => {
    configure({ adapter: new Adapter() });
  });

  test("reducer FETCH_RATES correctly", () => {
    expect.assertions(1);

    const reducer = RatesReducer([], {
      type: "FETCH_RATES",
      payload: { 0: 1234 }
    });

    expect(reducer).toEqual({ "0": 1234 });
  });

  test("reducer RATES_EXCHANGES correctly", () => {
    expect.assertions(1);

    const reducer = RatesReducer([], {
      type: "RATES_EXCHANGES",
      payload: { 0: 1234 }
    });

    expect(reducer).toEqual({ exchangesRates: { "0": 1234 } });
  });

  test("reducer default correctly", () => {
    expect.assertions(1);

    const reducer = RatesReducer(null, {
      type: "default"
    });

    expect(reducer).toEqual(null);
  });
});
