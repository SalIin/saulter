import mapboxgl from "mapbox-gl";

import { Waypoints } from "../types";

export const getRoute = async (waypoints: Waypoints) => {
  const waypointsCoordinates = waypoints
    .map((waypoint) => `${waypoint[0]},${waypoint[1]}`)
    .join(";");

  const qs = `https://api.mapbox.com/directions/v5/mapbox/walking/${waypointsCoordinates}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

  const query = await fetch(qs);
  const json = await query.json();

  const route = json.routes[0];

  return route;
};
