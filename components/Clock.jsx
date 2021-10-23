import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { time: "", date: "" };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.tick();
    }, 1000);
  }
  tick() {
    let date = new Date();
    this.setState({
      time: date.toLocaleTimeString("it-IT", { timeStyle: "short" }),
      date: date.toLocaleDateString("it-IT"),
    });
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return (
      <div className="text-right">
        <h3 className="text-xl">{this.state.time}</h3>
        <h4 className="text-sm">{this.state.date}</h4>
      </div>
    );
  }
}

export { Clock };
