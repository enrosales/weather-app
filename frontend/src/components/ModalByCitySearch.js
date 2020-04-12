import React, { Component } from "react";
import ReactDOM from "react-dom";
import CustomTextInput from "./CustomTextInput";

export default class ModalByCitySearch extends Component {
  render() {
    if (!this.props.visible) {
      return null;
    }

    return ReactDOM.createPortal(
      <div className="modal">
        <h1>Choose city</h1>
        <CustomTextInput
          inputRef={el => (this.inputElement = el)}
          handleCityChange={this.props.handleCityChange}
          placeholder="Type a city"
          name="city"
          className="textbox"
          type="text"
          handleCloseModal={this.props.handleCloseModal}
        />
      </div>,
      document.getElementById("modal-root")
    );
  }
}
