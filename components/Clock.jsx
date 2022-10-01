import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date().toISOString() };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.tick();
    }, 1000);
  }
  tick() {
    let date = new Date();
    this.setState({
      date: date.toLocaleDateString('en-US', {dateStyle: 'medium'}),
      time: date.toLocaleTimeString('it-IT', {minute: '2-digit', hour: '2-digit'}),
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
