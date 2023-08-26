import { METRICS } from "../../../constants/metrics";

export const CONTAINER_STYLE = {
  width: "100%",
  height: "100%",
  minHeight: METRICS.MIN_MAP_HEIGHT,
};

export const CENTER = {
  lat: 48.468862,
  lng: 35.051413,
};

export const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
