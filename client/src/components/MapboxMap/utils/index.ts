import mapboxgl from "mapbox-gl";
import { MutableRefObject } from "react";

export const initMap = (
  map: MutableRefObject<mapboxgl.Map | null>,
  mapContainer: MutableRefObject<HTMLDivElement | null>,
  center: [number, number],
  zoom: number
) => {
  map.current = new mapboxgl.Map({
    // @ts-ignore
    container: mapContainer.current,
    style: "mapbox://styles/mapbox/navigation-night-v1",
    center,
    zoom,
  });
};
