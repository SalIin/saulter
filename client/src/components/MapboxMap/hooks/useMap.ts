import mapboxgl, { GeoJSONSource } from "mapbox-gl";
import { useRef, useState } from "react";

import { CENTER } from "../constants";

import { Map, Waypoints } from "../types";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY ?? "";

export const useMap = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const [map, setMap] = useState<Map>(null);

  const [waypoints, setWaypoints] = useState<Waypoints | []>([]);

  const initMap = () => {
    const map = new mapboxgl.Map({
      // @ts-ignore
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: CENTER,
      zoom: 9,
    });

    setMap(map);
  };

  const initListeners = () => {
    if (!map) return;

    map.on("click", (event) => {
      const coordinates = Object.keys(event.lngLat).map(
        (key) => event.lngLat[key as "lng" | "lat"]
      ) as [number, number];

      setWaypoints((prev) => [...prev, coordinates]);
    });
  };

  const paintMarkers = () => {
    if (!map) return;

    waypoints.forEach((waypoint, idx) => {
      const markerId = `marker-${idx}`;

      const point: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: waypoint,
            },
          },
        ],
      };

      if (map.getLayer(markerId)) {
        const geoJsonSource = map.getSource(markerId) as GeoJSONSource;

        geoJsonSource.setData(point);
      } else {
        map.addLayer({
          id: markerId,
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: waypoint,
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 7,
            "circle-color": "#669efd",
          },
        });
      }
    });
  };

  return { map, mapContainer, waypoints, initMap, initListeners, paintMarkers };
};
