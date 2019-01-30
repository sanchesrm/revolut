import React, { Component } from "react";
import { Container, Header, Image, Button, Message } from "semantic-ui-react";
import CurrencyContent from "../components/CurrencyContent";
import PropTypes from "prop-types";
import { fetchRates, getRatesExchanges } from "../actions/Rates";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Logo from "../assets/imgs/logo.png";

const styles = {
  buttonStyle: {
    width: "300px",
    height: "50px",
    marginTop: "25px",
    backgroundImage:
      "linear-gradient(to right, rgba(0, 128, 0, 0.5), rgba(0, 128, 0, 0.7)",
    fontSize: "20px"
  },
  divStyle: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#1881ec"
  }
};

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choosenCurrency: ["GBP", "USD"],
      currencyAmounts: {
        GBP: this.randomCurrencyAmounts(),
        EUR: this.randomCurrencyAmounts(),
        USD: this.randomCurrencyAmounts()
      },
      inputValues: { 0: "0.00", 1: "0.00" },
      hideError: true,
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.props.fetchRates(this.state.choosenCurrency);
    setInterval(() => {
      this.props.fetchRates(this.state.choosenCurrency);
    }, 10000);
  }

  randomCurrencyAmounts = () => {
    return parseFloat((Math.random() * (100 - 0) + 0).toFixed(2));
  };

  handleCurrencyChoose = (name, position) => {
    let choosenCurrency = this.state.choosenCurrency;
    if (!choosenCurrency.includes(name)) {
      choosenCurrency[position] = name;
      this.setState({ choosenCurrency }, () => {
        if (this.props.RatesReducer.exchangesRates) {
          this.props.getRatesExchanges(
            this.state.choosenCurrency,
            this.props.RatesReducer
          );
        } else {
          this.showErrorMessage(
            "It was not possible to get the currencies rates. Check your internet connection"
          );
        }
      });
    }
  };

  changeHandler = (value, position) => {
    if (this.props.RatesReducer.exchangesRates) {
      const oppositePosition = !position ? 1 : 0;
      let { inputValues } = this.state;
      inputValues[position] = parseFloat(value);
      inputValues[oppositePosition] =
        -1 * value * this.props.RatesReducer.exchangesRates[position];

      this.setState({ inputValues });
    } else {
      this.showErrorMessage(
        "It was not possible to get the currencies rates. Check your internet connection"
      );
    }
  };

  exchangeClickHandler = () => {
    let { choosenCurrency, currencyAmounts, inputValues } = this.state;

    if (!this.props.RatesReducer.exchangesRates) {
      this.showErrorMessage("Type a value to exchange");
    } else if (inputValues[0] === "0.00" || inputValues[0] === "0.00") {
      this.showErrorMessage(
        "It was not possible to get the currencies rates. Check your internet connection"
      );
    } else {
      let firstValue = currencyAmounts[choosenCurrency[0]] + inputValues[0];
      let secondValue = currencyAmounts[choosenCurrency[1]] + inputValues[1];

      firstValue = firstValue.toFixed(2);
      secondValue = secondValue.toFixed(2);

      if (firstValue < 0 || secondValue < 0) {
        this.showErrorMessage("Operation not permitted");
      } else {
        currencyAmounts[choosenCurrency[0]] = parseFloat(firstValue);
        currencyAmounts[choosenCurrency[1]] = parseFloat(secondValue);

        inputValues = { 0: "0.00", 1: "0.00" };

        this.setState({
          currencyAmounts,
          inputValues
        });
      }
    }
  };

  showErrorMessage = errorMessage => {
    this.setState(
      {
        hideError: false,
        errorMessage
      },
      () => {
        setTimeout(() => {
          this.setState({
            hideError: true,
            errorMessage: ""
          });
        }, 3000);
      }
    );
  };

  render() {
    const {
      inputValues,
      choosenCurrency,
      currencyAmounts,
      hideError,
      errorMessage
    } = this.state;
    return (
      <div style={styles.divStyle}>
        <Container
          textAlign="center"
          style={{ marginTop: "25px", width: "600px" }}
        >
          <Header textAlign="center" style={{ marginBottom: "15px" }}>
            <Image src={Logo} style={{ width: "150px" }} />
          </Header>

          <CurrencyContent
            position={0}
            handleCurrencyChoose={this.handleCurrencyChoose}
            choosenCurrency={choosenCurrency}
            amount={currencyAmounts[choosenCurrency[0]]}
            changeHandler={this.changeHandler}
            inputValue={inputValues[0]}
          />
          <CurrencyContent
            position={1}
            handleCurrencyChoose={this.handleCurrencyChoose}
            choosenCurrency={choosenCurrency}
            amount={currencyAmounts[choosenCurrency[1]]}
            changeHandler={this.changeHandler}
            inputValue={inputValues[1]}
          />
          <Button
            style={styles.buttonStyle}
            content="Exchange"
            onClick={this.exchangeClickHandler}
            primary
          />
          <Message
            style={{ marginTop: "20px" }}
            color="red"
            error={true}
            hidden={hideError}
          >
            {errorMessage}
          </Message>
        </Container>
      </div>
    );
  }
}

App.propTypes = {
  fetchRates: PropTypes.func.isRequired,
  getRatesExchanges: PropTypes.func.isRequired
};

export const mapStateToProps = ({ RatesReducer }) => {
  return { RatesReducer };
};

export const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchRates, getRatesExchanges }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
