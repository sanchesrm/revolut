import React, { Component } from "react";
import { Menu, Segment, Input, Form } from "semantic-ui-react";
import PropTypes from "prop-types";

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
  }
};

const currenciesAvailable = ["GBP", "EUR", "USD"];

class App extends Component {
  renderInput = () => {
    return (
      <input type="text" style={{ textAlign: "start", direction: "rtl" }} />
    );
  };
  render() {
    return (
      <div
        style={{
          ...style.divStyle,
          backgroundImage: `linear-gradient(to right, ${
            this.props.primaryColor
          }, ${this.props.secondaryColor})`
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
                active={currency === this.props.choosenCurrency}
                onClick={(undefined, { name }) =>
                  this.props.handleCurrencyChoose(name, this.props.tabIndex)
                }
              />
            );
          })}
        </Menu>
        <Segment.Group horizontal style={style.segmentGroup}>
          <Segment textAlign="left" padded="very" style={style.borderNone}>
            <div style={style.currencyHeader}>Left</div>
            <div style={style.currencySubheader}>You have: $13.00</div>
          </Segment>

          <Segment textAlign="right" padded="very" style={style.borderNone}>
            <Input
              style={{ display: "block", textAlign: "start", direction: "rtl" }}
              size="massive"
              autoFocus={this.props.autoFocus}
              transparent
              inverted
              labelPosition={"right"}
              tabIndex={this.props.tabIndex}
              input={<input style={{ textAlign: "start", direction: "rtl" }} />}
            />
            <div style={style.currencySubheader}>U$ 1.00 = L 1.00</div>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

App.propTypes = {
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  choosenCurrency: PropTypes.string,
  autoFocus: PropTypes.bool,
  tabIndex: PropTypes.number,
  handleCurrencyChoose: PropTypes.func
};

export default App;
