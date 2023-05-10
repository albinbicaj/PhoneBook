import React, { Component } from "react";
import "./App.css";
import PhoneForm from "./components/PhoneForm/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList/PhoneInfoList";

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: "Albin",
        lname: "Bicaj",
        email: "albinbicaj3@gmail.com",
        address: "123456789",
        country: "Kosovo",
        city: "Prishtine",
        phone: "135315315",
      },
      {
        id: 1,
        name: "hello",
        lname: "hello",
        email: "hello@example.com",
        address: "123456789",
        country: "Kosovo",
        city: "Prishtine",
        phone: "135315315",
      },
    ],
    keyword: "",
  };

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({
        id: this.id++,
        name: data.name,
        phone: data.phone,
        lname: data.lname,
        email: data.email,
        address: data.address,
        country: data.country,
        city: data.city,
      }),
    });
  };

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter((info) => info.id !== id),
    });
  };

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map((info) =>
        info.id === id ? { ...info, ...data } : info
      ),
    });
  };

  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      (info) => info.name.indexOf(keyword) !== -1
    );

    return (
      <div className="phonebook">
        <PhoneForm onCreate={this.handleCreate} />
        <input
          className="search-input"
          placeholder="Search By Name"
          onChange={this.handleChange}
          value={keyword}
        />
        <hr />
        <PhoneInfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
