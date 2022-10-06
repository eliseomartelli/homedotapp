import { Component } from "react";
import { serviceFromId } from "../lib/serviceFromId.js";
import { updateState, callService } from "../lib/state.js";
import config from "../config.json";

const ICONS = {
  light: {
    on: "lightbulb.fill@2x.png",
    off: "lightbulb@2x.png",
    unavailable: "lightbulb@2x.png",
  },
  switch: {
    on: "bolt.fill@2x.png",
    off: "bolt@2x.png",
  },
  media_player: {
    playing: "pause.circle@2x.png",
    paused: "pause.circle@2x.png",
    buffering: "pause.circle@2x.png",
    idle: "homepod.and.homepodmini@2x.png",
    off: "homepod.and.homepodmini@2x.png",
  }
}

export class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.service = serviceFromId(this.props.id);
    this.isScene = this.props.id.includes("scene");
    this.type = this.props.id.split(".")[0];
    this.touchStart = Number.MIN_VALUE;
    this.touchEnd = Number.MIN_VALUE;
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
      "p-4 rounded-xl transition-all duration-500 mx-1 mb-2 flex flex-row items-center",
      this.state.state === "on" || this.state.state === "playing"
        ? "bg-white text-black"
        : "bg-black bg-opacity-40 text-white",
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
        {!this.isScene &&
          <div className={`bg-black ${(this.state.state === "on" || this.state.state === "playing")?"bg-opacity-75" : "bg-opacity-50"} h-12 w-12 rounded-full flex items-center justify-center mr-2`}>
            <img src={`/icons/${(this.props?.icons  || ICONS[this.type] || ICONS.light)[this.state.state]}`} className="block h-6 w-6 object-contain" style={{
              filter: this.state.state === "on" ? "brightness(0) saturate(100%) invert(77%) sepia(53%) saturate(2500%) hue-rotate(359deg) brightness(109%) contrast(102%)" : "",
            }}/>
          </div>
        }
        <div>
        <p className="font-bold flex-grow">
          {this.props.name
            ? this.props.name
            : this.state.attributes?.friendly_name}
        </p>
        {this.isScene ? (
          <></>
        ) : (
          <p className="opacity-50 capitalize">{this.state.state}</p>
        )}
        </div>
      </div>
    );
  }
}