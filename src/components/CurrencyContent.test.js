import Adapter from "enzyme-adapter-react-16";
import React from "react";
import toJson from "enzyme-to-json";
import { configure, shallow, mount } from "enzyme";
import { CurrencyContent } from "./CurrencyContent";

describe("Login Component", () => {
  let props;
  beforeEach(() => {
    configure({ adapter: new Adapter() });
    props = {
      choosenCurrency: ["GBP", "USD"],
      position: 0,
      handleCurrencyChoose: jest.fn(),
      changeHandler: jest.fn(),
      inputValue: 1234,
      amount: 0.0,
      RatesReducer: { exchangesRates: { 0: 1.0, 1: 1.0 } }
    };
  });

  test("render correctly", () => {
    expect.assertions(1);

    const wrapper = shallow(<CurrencyContent {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("render correctly", () => {
    expect.assertions(1);

    props = { ...props, position: 1, RatesReducer: {} };
    const wrapper = shallow(<CurrencyContent {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("handleCurrencyChoose to have been called", () => {
    expect.assertions(1);

    const wrapper = mount(<CurrencyContent {...props} />);

    const handleCurrencyChooseMethod = jest.spyOn(
      props,
      "handleCurrencyChoose"
    );

    const currencyToggle = wrapper.find("div.three.item.menu a").get(1);
    currencyToggle.props.onClick();

    expect(handleCurrencyChooseMethod).toHaveBeenCalled();
  });

  test("handleCurrencyChoose to have been called", () => {
    expect.assertions(1);

    const wrapper = mount(<CurrencyContent {...props} />);

    const changeHandlerMethod = jest.spyOn(props, "changeHandler");

    const currencyChangeInput = wrapper
      .find("div.ui.massive.inverted.transparent.input input")
      .get(0);
    currencyChangeInput.props.onChange({
      preventDefault: () => {},
      target: {
        value: "1234"
      },
      persist: () => {}
    });

    expect(changeHandlerMethod).toHaveBeenCalled();
  });
});
