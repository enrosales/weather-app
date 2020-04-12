import React, { PureComponent } from "react";

export default class CityDetails extends PureComponent {
  state = {
    temperature: "",
    clouds: "",
    tempMin: "",
    tempMax: "",
    city: "",
    cargando: true
  };
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { apiUrl, city } = this.props;
    let result = await this.getRequest(apiUrl, city);
    if (result !== "Not Found") {
      this.updateState(result);
    } else {
      const cityByDefault = localStorage.getItem("defaultCity");
      result = await this.getRequest(apiUrl, cityByDefault);
      this.updateState(result);
    }
  };

  getRequest = async (apiUrl, city) => {
    let res = await fetch(`${apiUrl}/weather/${city}`);
    const data = await res.json();
    const { result } = data;
    return result;
  };

  updateState = result => {
    this.setState({
      temperature: result.main.temp,
      clouds: result.weather[0].description,
      tempMin: result.main.temp_min,
      tempMax: result.main.temp_max,
      city: this.props.city,
      cargando: false
    });
    //propagando al padre los datos de la temperatura de la ciudad
    this.props.cityTemperature(this.convertKelvinToCelsius(result.main.temp));
  };

  convertKelvinToCelsius = gradosK => {
    return Number.parseInt(gradosK - 273.15);
  };

  render() {
    if (this.state.city !== this.props.city) {
      this.getData();
      return null;
    }
    const { temperature, cargando, clouds, tempMin, tempMax } = this.state;
    return (
      <div>
        <div> {cargando && <h1>Cargando...</h1>} </div>
        <h1 className="temp"> {this.convertKelvinToCelsius(temperature)}°c</h1>
        <h3 className="divisor">---------------</h3>
        <h4 className="clouds"> {clouds} </h4>
        <h5 className="temperature">
          {" "}
          {this.convertKelvinToCelsius(tempMin)}°c /{" "}
          {this.convertKelvinToCelsius(tempMax)}°c{" "}
        </h5>
      </div>
    );
  }
}
