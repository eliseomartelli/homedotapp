import { Component } from "react";
import { serviceFromId } from "../lib/serviceFromId.js";
import { updateState, callService } from "../lib/state.js";
import config from "../config.json";

export class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.service = serviceFromId(this.props.id);
    this.isScene = this.props.id.includes("scene");
  }
  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.fetchState();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  fetchState() {
    updateState(
      config.homeassistant_url,
      this.props.id,
      config.homeassistant_token
    ).then((res) => {
      if (typeof res === "error" || res === null) {
        return;
      }
      this.setState(res);
    });
  }
  render() {
    const classNames = [
      "p-4 rounded-xl transition-all duration-500 mx-1  mb-4 flex flex-col items-baseline",
      this.state.state === "on" || this.state.state === "playing"
        ? "bg-white text-black"
        : "bg-black text-white opacity-75",
    ];
    return (
      <div
        className={classNames.join(" ")}
        onClick={async () => {
          await callService(
            config.homeassistant_url,
            this.props.id,
            this.service,
            config.homeassistant_token
          );
          this.fetchState();
        }}
      >
        <p className="font-bold flex-grow">
          {this.props.name
            ? this.props.name
            : this.state.attributes?.friendly_name}
        </p>
        {this.isScene ? (
          <></>
        ) : (
          <p className="opacity-50 uppercase">{this.state.state}</p>
        )}
      </div>
    );
  }
}
