import React, { Component } from "react";
import PhoneInfo from "../PhoneInfo/PhoneInfo";
import "./PhoneInfoList.css";

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.log("onRemove not defined..."),
    onUpdate: () => console.log("onUpdate not defined..."),
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  }

  render() {
    console.log("render PhoneInfoList");
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map((info) => (
      <PhoneInfo
        key={info.id}
        info={info}
        onRemove={onRemove}
        onUpdate={onUpdate}
        className="phone-info"
      />
    ));
    return <div className="phone-info-list">{list}</div>;
  }
}

export default PhoneInfoList;
