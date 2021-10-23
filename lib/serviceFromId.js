const DEFAULT_SERVICE = "homeassistant/toggle";
const SERVICES = {
  scene: "scene/turn_on",
  media_player: "media_player/media_play_pause",
};

export const serviceFromId = (id) => {
	return SERVICES[id.split(".")[0]] || DEFAULT_SERVICE;
};
