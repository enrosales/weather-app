import React, { Component } from "react";
import CityDetails from "./CityDetails";
import ThreeDaysLater from "./ThreeDaysLater";
import ModalByCitySearch from "./ModalByCitySearch";
import "./weatherApp.css";

const API_URL = "http://localhost:4000/api";
let backgroundParams = `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3))`;

export default class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: "Weatherman",
      city: props.city,
      date: "",
      cargando: true,
      backgroundImage: "",
      visible: false,
      cityTemperature: ""
    };
    localStorage.setItem("defaultCity", this.state.city);
  }
  componentDidMount() {
    this.getDate();
    this.getBackgroundImage(this.state.city);
  }

  openModal = () => {
    this.setState({
      visible: true
    });
  };

  getDate = async () => {
    const res = await fetch(`${API_URL}/getdate`);
    const date = await res.json();
    this.setState({ date: date.date });
  };

  getBackgroundImage = async city => {
    const res = await fetch(`${API_URL}/images/${city}`);
    const image = await res.json();
    // si es la imagen por default actualizo mi ciudad a la ciudad por defecto
    let defaultCity = "";
    if (image.default === true) {
      defaultCity = localStorage.getItem("defaultCity");
      this.setState({ city: defaultCity });
    }
    this.setState({ backgroundImage: image.url, cargando: false });
    //notificando al padre el cambio de background
    this.props.background(image.url);
  };

  handleCityChange = (name, text) => {
    this.setState({
      [name]: text,
      visible: false
    });
    //actualizando el background a mi nueva ciudad
    this.getBackgroundImage(text);
  };

  handleCloseModal = () => {
    this.setState(state => ({
      visible: false
    }));
  };

  changeBackgroundFilter = temp => {
    this.setState({ cityTemperature: temp });
  };

  render() {
    if (this.state.cargando) {
      return <h1>Cargando...</h1>;
    }
    const { appName, city, date } = this.state;

    const cityTempInt = Number.parseInt(this.state.cityTemperature);
    if (cityTempInt >= 15 && cityTempInt < 30)
      backgroundParams = `linear-gradient(rgba(198,89,46,0.3), rgba(198,89,46,0.3))`;
    else if (cityTempInt >= 30)
      backgroundParams = `linear-gradient(rgba(207,182,37,0.1), rgba(207,182,37,0.1))`;
    return (
      <div
        style={{
          backgroundImage: `${backgroundParams} , url('${this.state.backgroundImage}')`,
          backgroundSize: "cover"
        }}
        className="weather-app"
      >
        <p> {appName} </p>
        <h1 className="city"> {city} </h1>
        <h6 className="date"> {date} </h6>
        <CityDetails
          apiUrl={API_URL}
          city={city}
          cityTemperature={this.changeBackgroundFilter}
        />
        <ThreeDaysLater apiUrl={API_URL} />
        <button className="button" onClick={this.openModal}>
          ^
        </button>
        <ModalByCitySearch
          handleCityChange={this.handleCityChange}
          visible={this.state.visible}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}
