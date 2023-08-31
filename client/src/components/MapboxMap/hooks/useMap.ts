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

    map.loadImage(
      "https://img.icons8.com/?size=512&id=21612&format=png",
      (err, image) => {
        if (err || !image) throw err;

        map.addImage("marker", image);
      }
    );

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
          type: "symbol",
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
          layout: {
            "icon-image": "marker",
            "icon-size": 0.05,
            "icon-anchor": "bottom",
            "symbol-sort-key": 20,
            "icon-allow-overlap": true,
          },
        });

        initMarkerListeners(markerId);
      }
    });
  };

  const paintRoute = (route: any) => {
    if (!map) return;

    const coordinates = route.geometry.coordinates;

    const geojson: GeoJSON.Feature<GeoJSON.Geometry> = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates,
      },
    };

    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource("route")) {
      const geoJsonSource = map.getSource("route") as GeoJSONSource;
      geoJsonSource.setData(geojson);
    } else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
          "line-sort-key": 10,
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
  };

  const initMarkerListeners = (markerId: string) => {
    if (!map) return;

    const canvas = map.getCanvasContainer();

    map.on("mouseenter", markerId, () => {
      canvas.style.cursor = "move";
    });

    map.on("mouseleave", markerId, () => {
      canvas.style.cursor = "";
    });

    map.on("mousedown", markerId, (e) => {
      // Prevent the default map drag behavior.
      e.preventDefault();

      canvas.style.cursor = "grab";

      // map.on('mousemove', onMove);
      // map.once('mouseup', onUp);
    });
  };

  return {
    map,
    mapContainer,
    waypoints,
    initMap,
    initListeners,
    paintMarkers,
    paintRoute,
  };
};
