import Adapter from "enzyme-adapter-react-16";
import React from "react";
import toJson from "enzyme-to-json";
import { configure, shallow } from "enzyme";
import { App, mapStateToProps } from "./App";

describe("Login Component", () => {
  let props;
  beforeEach(() => {
    configure({ adapter: new Adapter() });
    props = {
      fetchRates: jest.fn(() => Promise.resolve()),
      getRatesExchanges: jest.fn(() => Promise.resolve())
    };
  });

  test("render correctly", () => {
    expect.assertions(1);

    const wrapper = shallow(<App {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("should generate random number", () => {
    expect.assertions(1);

    const wrapper = shallow(<App {...props} />);
    const randomNumber = wrapper.instance().randomCurrencyAmounts();

    expect(typeof randomNumber === "number").toEqual(true);
  });

  test("should handle currency change", () => {
    expect.assertions(3);

    const wrapper = shallow(<App {...props} />);
    const getRatesExchangesMethod = jest.spyOn(props, "getRatesExchanges");

    expect(wrapper.instance().state.choosenCurrency).toEqual(["GBP", "USD"]);

    wrapper.instance().handleCurrencyChoose("EUR", 1);

    expect(wrapper.instance().state.choosenCurrency).toEqual(["GBP", "EUR"]);
    expect(getRatesExchangesMethod).toHaveBeenCalled();
  });

  test("should handle currency change but it's already on the array", () => {
    expect.assertions(3);

    const wrapper = shallow(<App {...props} />);
    const getRatesExchangesMethod = jest.spyOn(props, "getRatesExchanges");

    expect(wrapper.instance().state.choosenCurrency).toEqual(["GBP", "USD"]);

    wrapper.instance().handleCurrencyChoose("GBP", 1);

    expect(wrapper.instance().state.choosenCurrency).toEqual(["GBP", "USD"]);
    expect(getRatesExchangesMethod).not.toHaveBeenCalled();
  });

  test("should handle value typing", () => {
    expect.assertions(2);
    props = {
      ...props,
      RatesReducer: {
        exchangesRates: [1, 2]
      }
    };

    const wrapper = shallow(<App {...props} />);

    expect(wrapper.instance().state.inputValues).toEqual({
      0: "0.00",
      1: "0.00"
    });

    wrapper.instance().changeHandler(5, 1);

    expect(wrapper.instance().state.inputValues).toEqual({ "0": -10, "1": 5 });
  });

  test("should handle value typing - position 0", () => {
    expect.assertions(2);
    props = {
      ...props,
      RatesReducer: {
        exchangesRates: [1, 2]
      }
    };

    const wrapper = shallow(<App {...props} />);

    expect(wrapper.instance().state.inputValues).toEqual({
      0: "0.00",
      1: "0.00"
    });

    wrapper.instance().changeHandler(5, 0);

    expect(wrapper.instance().state.inputValues).toEqual({ "0": 5, "1": -5 });
  });

  test("should handle click and value < 0", () => {
    expect.assertions(1);

    const wrapper = shallow(<App {...props} />);
    wrapper.instance().setState({
      currencyAmounts: {
        GBP: 10,
        USD: 20
      },
      inputValues: { 0: 30.0, 1: -30.0 }
    });

    wrapper.instance().exchangeClickHandler();

    expect(wrapper.instance().state.hideError).toEqual(false);
  });

  test("should handle click and value > 0", () => {
    expect.assertions(3);

    const wrapper = shallow(<App {...props} />);
    wrapper.instance().setState({
      currencyAmounts: {
        GBP: 10,
        USD: 20
      },
      inputValues: { 0: 10.0, 1: -10.0 }
    });

    wrapper.instance().exchangeClickHandler();

    expect(wrapper.instance().state.hideError).toEqual(true);
    expect(wrapper.instance().state.inputValues).toEqual({
      0: "0.00",
      1: "0.00"
    });
    expect(wrapper.instance().state.currencyAmounts).toEqual({
      GBP: 20,
      USD: 10
    });
  });

  test("test mapStateToProps", () => {
    expect.assertions(1);

    const wrapper = mapStateToProps({ RatesReducer: [1234] });

    expect(wrapper).toEqual({ RatesReducer: [1234] });
  });
});
