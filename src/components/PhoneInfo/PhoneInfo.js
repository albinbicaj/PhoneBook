import React, { Component } from "react";
import "./PhoneInfo.css";
import { v4 as uuidv4 } from "uuid";

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      id: 0,
      name: "name",
      lname: "lname",
      address: "address",
      city: "city",
      country: "country",
      email: "email",
      phone: "000-0000-0000",
    },
  };

  state = {
    editing: false,
    name: "",
    lname: "",
    address: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    additionalEmailInputs: [],
    additionalPhoneInputs: [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !this.state.editing &&
      !nextState.editing &&
      nextProps.info === this.props.info
    ) {
      return false;
    }
    return true;
  }

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };

  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAdditionalEmailChange = (e, index) => {
    const inputs = [...this.state.additionalEmailInputs];
    inputs[index].email = e.target.value;
    this.setState({ additionalEmailInputs: inputs });
  };

  handleAdditionalPhoneChange = (e, index) => {
    const inputs = [...this.state.additionalPhoneInputs];
    inputs[index].phone = e.target.value;
    this.setState({ additionalPhoneInputs: inputs });
  };
  handleAddEmailInput = () => {
    this.setState((prevState) => ({
      additionalEmailInputs: [
        ...prevState.additionalEmailInputs,
        { id: uuidv4(), email: "" },
      ],
    }));
  };
  handleRemoveEmailInput(index) {
    const inputs = [...this.state.additionalEmailInputs];
    inputs.splice(index, 1);
    this.setState({ additionalEmailInputs: inputs });
  }

  handleAddPhoneInput = () => {
    this.setState((prevState) => ({
      additionalPhoneInputs: [
        ...prevState.additionalPhoneInputs,
        { id: uuidv4(), phone: "" },
      ],
    }));
  };
  handleRemovePhoneInput(index) {
    const inputs = [...this.state.additionalPhoneInputs];
    inputs.splice(index, 1);
    this.setState({ additionalPhoneInputs: inputs });
  }
  componentDidUpdate(prevProps, prevState) {
    const { info, onUpdate } = this.props;

    if (!prevState.editing && this.state.editing) {
      this.setState({
        name: info.name,
        phone: info.phone,
        lname: info.lname,
        address: info.address,
        city: info.city,
        country: info.country,
        email: info.email,
      });
    }

    if (prevState.editing && !this.state.editing) {
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone,
        lname: this.state.lname,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        email: this.state.email,
      });
    }
  }

  render() {
    console.log("render PhoneInfo " + this.props.info.id);

    const { editing } = this.state;

    if (editing) {
      return (
        <div className="phone-info">
          <div className="input-field">
            Name
            <input
              value={this.state.name}
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            Last Name
            <input
              value={this.state.lname}
              name="lname"
              placeholder="Last Name"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            Address
            <input
              value={this.state.address}
              name="address"
              placeholder="Address"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            City
            <input
              value={this.state.city}
              name="city"
              placeholder="City"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            Country
            <input
              value={this.state.country}
              name="country"
              placeholder="Country"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            Email
            <input
              value={this.state.email}
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <button onClick={this.handleAddEmailInput}>Add</button>
          </div>
          {this.state.additionalEmailInputs.map((emailInput, index) => (
            <div className="input-field" key={index}>
              Additional Email
              <input
                value={emailInput.email}
                name={`additionalEmail-${index}`}
                placeholder="Email"
                onChange={(e) => this.handleAdditionalEmailChange(e, index)}
              />
              <button onClick={() => this.handleRemoveEmailInput(index)}>
                Remove
              </button>
            </div>
          ))}

          <div className="input-field">
            Phone
            <input
              value={this.state.phone}
              name="phone"
              placeholder="Phone Number"
              onChange={this.handleChange}
            />
            <button onClick={this.handleAddPhoneInput}>Add</button>
          </div>
          {this.state.additionalPhoneInputs.map((phoneInput, index) => (
            <div className="input-field" key={index}>
              Additional Phone
              <input
                value={phoneInput.phone}
                name={`additionalPhone-${index}`}
                placeholder="Phone Number"
                onChange={(e) => this.handleAdditionalPhoneChange(e, index)}
              />
              <button onClick={() => this.handleRemovePhoneInput(index)}>
                Remove
              </button>
            </div>
          ))}

          <button className="apply-button" onClick={this.handleToggleEdit}>
            Apply
          </button>
          <button className="delete-button" onClick={this.handleRemove}>
            Delete
          </button>
        </div>
      );
    }

    const { name, phone, lname, address, city, country, email } =
      this.props.info;
    const additionalEmails = this.state.additionalEmailInputs.map(
      (input) => input.email
    );
    const additionalPhones = this.state.additionalPhoneInputs.map(
      (input) => input.phone
    );
    return (
      <div className="phone-info">
        <div className="name-field">
          <b>{name}</b>
        </div>
        <div className="phone-field">
          {phone}
          {additionalPhones.map((phone, index) => (
            <div key={index} className="additional-phone-field">
              {phone}
            </div>
          ))}
        </div>
        <div className="lname-field">{lname}</div>
        <div className="address-field">{address}</div>
        <div className="city-field">{city}</div>
        <div className="country-field">{country}</div>
        <div className="email-field">
          {email}
          {additionalEmails.map((email, index) => (
            <div key={index} className="additional-email-field">
              {email}
            </div>
          ))}
        </div>
        <button className="edit-button" onClick={this.handleToggleEdit}>
          Edit
        </button>
        <button className="delete-button" onClick={this.handleRemove}>
          Delete
        </button>
      </div>
    );
  }
}

export default PhoneInfo;
