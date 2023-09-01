import { LngLat } from "mapbox-gl";

export type Map = mapboxgl.Map | null;
export type Waypoints = Waypoint[];

export interface MapboxMapProps {
  initialMarkers?: Pick<LngLat, "lat" | "lng">[];
  editable?: boolean;
  onRouteChange?: (
    length: number,
    markers: Pick<LngLat, "lng" | "lat">[]
  ) => void;
}

interface Waypoint {
  id: string;
  coordinates: [number, number];
}
