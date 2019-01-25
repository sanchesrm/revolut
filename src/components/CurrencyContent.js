import React, { Component } from "react";
import { Menu, Segment, Input } from "semantic-ui-react";
import PropTypes from "prop-types";
import { currenciesAvailable, currenciesSymbols } from "../config";
import CurrencyInput from "react-currency-input";
import { connect } from "react-redux";

const style = {
  borderNone: {
    border: "none"
  },
  currencyHeader: {
    fontSize: "35px",
    display: "block",
    lineHeight: "27px"
  },
  currencySubheader: { fontSize: "18px", marginTop: "20px" },
  segmentGroup: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    border: "none",
    boxShadow: "none",
    color: "white"
  },
  divStyle: {
    height: "250px",
    marginTop: "25px",
    borderRadius: "25px",
    padding: "15px",
    boxShadow: "5px 10px"
  },
  lightBlueColor: "#1c5aff",
  darkBlueColor: "#265ed2"
};

export class CurrencyContent extends Component {
  getCurrencyParse = () => {
    const { choosenCurrency, position, RatesReducer } = this.props;

    const firstCurrency = choosenCurrency[0];
    const secondCurrency = choosenCurrency[1];

    const firstSymbol = currenciesSymbols[firstCurrency];
    const secondSymbol = currenciesSymbols[secondCurrency];

    const exchangeRates = this.props.RatesReducer.exchangesRates
      ? RatesReducer.exchangesRates[position].toFixed(2)
      : 1;
    return (
      <div style={style.currencySubheader}>{`${
        position === 0 ? firstSymbol : secondSymbol
      } 1.00 - ${
        position === 0 ? secondSymbol : firstSymbol
      } ${exchangeRates}`}</div>
    );
  };

  render() {
    const {
      choosenCurrency,
      position,
      handleCurrencyChoose,
      amount,
      changeHandler,
      inputValue
    } = this.props;
    const whichCurrency = choosenCurrency[position];

    const [primaryColor, secondaryColor] =
      position === 0
        ? [style.lightBlueColor, style.darkBlueColor]
        : [style.darkBlueColor, style.lightBlueColor];

    return (
      <div
        style={{
          ...style.divStyle,
          backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
        }}
      >
        <Menu
          pointing
          secondary
          fluid
          widths={3}
          borderless
          inverted
          another={"first"}
          style={{ borderWidth: "0px", fontSize: "18px" }}
        >
          {currenciesAvailable.map(currency => {
            return (
              <Menu.Item
                name={currency}
                key={currency}
                active={currency === whichCurrency}
                onClick={(e, { name }) => handleCurrencyChoose(name, position)}
              />
            );
          })}
        </Menu>
        <Segment.Group horizontal style={style.segmentGroup}>
          <Segment textAlign="left" padded="very" style={style.borderNone}>
            <div style={style.currencyHeader}>{whichCurrency}</div>
            <div style={style.currencySubheader}>
              You have:
              <span style={{ fontWeight: 600 }}>
                {` ${currenciesSymbols[whichCurrency]} ${amount}`}
              </span>
            </div>
          </Segment>

          <Segment textAlign="right" padded="very" style={style.borderNone}>
            <Input
              size="massive"
              inverted
              transparent
              tabIndex={position + 1}
              style={{ width: "110px" }}
              input={
                <CurrencyInput
                  decimalSeparator={"."}
                  thousandSeparator={""}
                  allowNegative={true}
                  precision={2}
                  onChangeEvent={(e, data) => {
                    changeHandler(data, position);
                  }}
                  value={inputValue}
                />
              }
            />
            {this.getCurrencyParse()}
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

CurrencyContent.propTypes = {
  choosenCurrency: PropTypes.array.isRequired,
  position: PropTypes.number.isRequired,
  handleCurrencyChoose: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  amount: PropTypes.number.isRequired
};

export const mapStateToProps = ({ RatesReducer, exchangesRates }) => {
  return { RatesReducer, exchangesRates };
};

export default connect(mapStateToProps)(CurrencyContent);
