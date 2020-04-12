import React, { Component } from "react";
import "./App.css";
import WeatherApp from "./components/WeatherApp";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      city: "Toronto",
      background: ""
    };
  }
  changeBackground = background => {
    this.setState({ background });
  };
  render() {
    return (
      <div>
        <div
          style={{ backgroundImage: `url('${this.state.background}')` }}
          className="App"
        ></div>
        <div>
          <WeatherApp
            city={this.state.city}
            background={this.changeBackground}
          />
        </div>
      </div>
    );
  }
}
