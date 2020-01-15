import React, { Component } from "react";
import dayjs from "dayjs";

export default class HearderData extends Component {
  state = {
    data: Date.now()
  };

  componentWillMount = () => {
    //定义一个定时器 时时刷新时间
    this.interid = setInterval(() => {
      this.setState({
        data: Date.now()
      });
    }, 1000);
  };
  render() {
    const { data } = this.state;
    return (
      <span className="header-main-right">
        {dayjs(data).format("YYYY-MM-DD hh-mm-ss")}
      </span>
    );
  }
}
