export type Map = mapboxgl.Map | null;
export type Waypoints = Waypoint[];

export interface MapboxMapProps {
  onRouteChange: (length: number) => void;
}

interface Waypoint {
  id: string;
  coordinates: [number, number];
}
