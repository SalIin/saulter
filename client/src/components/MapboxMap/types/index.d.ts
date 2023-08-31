export type Map = mapboxgl.Map | null;
export type Waypoints = Waypoint[];

interface Waypoint {
  id: string;
  coordinates: [number, number];
}
