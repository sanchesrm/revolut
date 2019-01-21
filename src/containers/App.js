import React, { Component } from "react";
import { Container, Header, Image, Button } from "semantic-ui-react";
import CurrencyContent from "../components/CurrencyContent";
import Logo from "../assets/imgs/logo.png";

const styles = {
  buttonStyle: {
    width: "300px",
    height: "50px",
    marginTop: "40px",
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

class App extends Component {
  constructor() {
    this.state = {
      choosenCurrency: { 0: }
    }
  }
  handleCurrencyChoose = (name, tabIndex) => {
    console.log(tabIndex);
    console.log(name);
    let choosenCurrency = this.state.choosenCurrency
    this.setState({ choosenCurrency: });
  };

  render() {
    return (
      <div style={styles.divStyle}>
        <Container
          textAlign="center"
          style={{ marginTop: "100px", width: "600px" }}
        >
          <Header textAlign="center" style={{ marginBottom: "15px" }}>
            <Image src={Logo} style={{ width: "150px" }} />
          </Header>

          <CurrencyContent
            primaryColor={"#1c5aff"}
            secondaryColor={"#265ed2"}
            autoFocus={true}
            tabIndex={1}
            handleCurrencyChoose={this.handleCurrencyChoose}
          />
          <CurrencyContent
            primaryColor={"#265ed2"}
            secondaryColor={"#1c5aff"}
            autoFocus={false}
            tabIndex={2}
            handleCurrencyChoose={this.handleCurrencyChoose}
          />
          <Button style={styles.buttonStyle} content="Exchange" primary />
        </Container>
      </div>
    );
  }
}

export default App;
