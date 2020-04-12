import React, { Component } from "react";
import cities from "./Cities";

const pattern = new RegExp("^[A-Z]+$", "i"); // letras de la A-Z o a-z porque la i dice que es case insensitive y que las letras se pueden repetir...

export default class CustomTextInput extends Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    this.setTextInputref = element => {
      this.textInput = element;
    };
    this.focusTextInput = () => {
      if (this.textInput) this.textInput.focus();
    };
    this.state = {
      text: "",
      hasError: false,
      suggestions: []
    };
  }

  componentDidMount() {
    this.focusTextInput();
  }

  onChange = () => {
    const { value } = this.textInput;
    //tratando de llenar las sugerencias
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = cities.sort().filter(_city => regex.test(_city));
    }
    //actualizando el estado del componente
    this.setState({ text: value, suggestions });
    //viendo si es valido el campo ciudad en tiempo de ejecucion
    if (pattern.test(value)) {
      this.setState({ hasError: false });
    } else {
      this.setState({ hasError: true });
    }
  };

  updateCity = () => {
    const cityToSearch = this.state.text.trim();
    if (pattern.test(cityToSearch)) {
      //si la ciudad es valida y solo contiene letras
      // Propagando datos al padre -> mando a actualizarla
      this.props.handleCityChange(this.textInput.name, this.state.text);
    }
  };

  closeModal = () => {
    this.props.handleCloseModal();
  };

  selectedText = value => {
    this.setState({
      text: value.nativeEvent.target.innerText,
      suggestions: []
    });
  };

  renderSuggestions = () => {
    let { suggestions } = this.state;
    if (suggestions.length === 0) return null;
    return (
      <ul>
        {suggestions.map(city => (
          <li
            key={Math.random().toString(16)}
            onClick={this.selectedText}
            value={city}
          >
            {city}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const inputStyle = {
      borderColor: this.state.hasError ? "red" : "green"
    };
    const { type, placeholder, className, name } = this.props;
    return (
      <div id="notebooks">
        <input
          id="query"
          style={inputStyle}
          type={type}
          value={this.state.text}
          placeholder={placeholder}
          name={name}
          onChange={this.onChange}
          className={className}
          ref={this.setTextInputref}
          autoComplete="off"
        />
        {this.renderSuggestions()}
        <span>Suggestions: {this.state.suggestions.length} </span>
        <button onClick={this.updateCity}>Update</button>
        <button onClick={this.closeModal}>Close</button>
      </div>
    );
  }
}
