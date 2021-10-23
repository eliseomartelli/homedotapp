import { Component } from "react";
import config from "../config.json";
import { updateState } from "../lib/state.js";

export class Weather extends Component {
  constructor(props) {
    super(props);
  }
  fetchState() {
    updateState(
      config.homeassistant_url,
      "weather.home",
      config.homeassistant_token
    ).then((res) => {
      if (typeof res === "error" || res === null) {
        return;
      }
      this.setState({
        condition: res.state,
        temperature: res.attributes.temperature,
        rhu: res.attributes.humidity,
      });
    });
  }
  componentDidMount() {
    this.fetchState();
    this.intervalID = setInterval(() => {
      this.fetchState();
    }, 1000 * 60 * 5);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  render() {
    return (
      <div className="flex">
        <div className="text-right">
          <h1 className="text-xl">{this.state?.rhu} %</h1>
          <p className="text-sm capitalize">Humidity</p>
        </div>
        <div className="mx-8 text-right">
          <h1 className="text-xl">{this.state?.temperature} °C</h1>
          <p className="text-sm capitalize">{this.state?.condition}</p>
        </div>
      </div>
    );
  }
}
