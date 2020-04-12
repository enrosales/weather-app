import React, { Component } from "react";

export default class ThreeDaysLater extends Component {
  state = {
    oneDayLater: "",
    twoDaysLater: "",
    threeDaysLater: "",
    weather: [],
    temp: [],
    cargando: true
  };
  componentDidMount() {
    this.getThreeDays();
    this.getThreeDaysWeather();
    this.setState({ cargando: false });
  }

  getThreeDaysWeather = async () => {
    const { apiUrl } = this.props;
    const res = await fetch(`${apiUrl}/weather/pronostics/three-days-weather`);
    const data = await res.json();
    const { weatherThreeDaysLater } = data;
    this.setState({
      weather: weatherThreeDaysLater.weather,
      temp: weatherThreeDaysLater.temp
    });
  };

  getThreeDays = async () => {
    const { apiUrl } = this.props;
    const res = await fetch(`${apiUrl}/weather/pronostics/three-days`);
    const data = await res.json();
    const { threeDays } = data;
    this.setState({
      oneDayLater: threeDays.oneDay,
      twoDaysLater: threeDays.twoDays,
      threeDaysLater: threeDays.threeDays
    });
  };
  render() {
    const {
      cargando,
      oneDayLater,
      twoDaysLater,
      threeDaysLater,
      weather,
      temp
    } = this.state;

    return (
      <div>
        {cargando && <h2>Cargando...</h2>}
        {!cargando && (
          <div className="threeDaysLater">
            <div className="daysLater">
              <p>
                <img src={weather[0]} alt="" /> <br /> {temp[0]}°C <br />{" "}
                {oneDayLater}
              </p>
            </div>
            <div className="daysLater">
              <p>
                <img src={weather[1]} alt="" /> <br /> {temp[1]}°C <br />{" "}
                {twoDaysLater}
              </p>
            </div>
            <div className="daysLater">
              <p>
                <img src={weather[2]} alt="" /> <br /> {temp[2]}°C <br />{" "}
                {threeDaysLater}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
