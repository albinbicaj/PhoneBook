import React, { Component } from "react";
import "./PhoneForm.css";

class PhoneForm extends Component {
  state = {
    name: "",
    lname: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    isExpanded: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state);
    this.setState({
      name: "",
      lname: "",
      email: "",
      address: "",
      city: "",
      country: "",
      phone: "",
      isExpanded: false,
    });
  };

  handleExpandClick = () => {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  };

  render() {
    const { isExpanded } = this.state;

    return (
      <div className="phone-form-container">
        <button onClick={this.handleExpandClick} className="toggle-button">
          {isExpanded ? "Hide Form" : "Add a Client"}
        </button>
        {isExpanded && (
          <form onSubmit={this.handleSubmit} className="phone-form">
            <input
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
              className="input-field"
            />
            <input
              placeholder="Last Name"
              value={this.state.lname}
              onChange={this.handleChange}
              name="lname"
              className="input-field"
            />
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
              className="input-field"
            />
            <input
              placeholder="Address"
              value={this.state.address}
              onChange={this.handleChange}
              name="address"
              className="input-field"
            />
            <input
              placeholder="City"
              value={this.state.city}
              onChange={this.handleChange}
              name="city"
              className="input-field"
            />
            <input
              placeholder="Country"
              value={this.state.country}
              onChange={this.handleChange}
              name="country"
              className="input-field"
            />
            <input
              placeholder="Phone Number"
              value={this.state.phone}
              onChange={this.handleChange}
              name="phone"
              className="input-field"
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default PhoneForm;
