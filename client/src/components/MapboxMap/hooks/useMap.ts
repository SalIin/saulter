import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import mapboxgl, { GeoJSONSource } from "mapbox-gl";

import { CENTER } from "../constants";

import { Map, Waypoints } from "../types";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY ?? "";

export const useMap = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const [map, setMap] = useState<Map>(null);

  const [waypoints, setWaypoints] = useState<Waypoints | []>([]);

  let moveHandler: any;
  let upHandler: any;

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

      setWaypoints((prev) => [...prev, { id: uuid(), coordinates }]);
    });
  };

  const paintMarkers = () => {
    if (!map) return;

    waypoints.forEach(({ id, coordinates }) => {
      const point: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates,
            },
          },
        ],
      };

      if (map.getLayer(id)) {
        const geoJsonSource = map.getSource(id) as GeoJSONSource;

        geoJsonSource.setData(point);
      } else {
        map.addLayer({
          id: id,
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
                    coordinates,
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

        initMarkerListeners(id);
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
      e.preventDefault();

      canvas.style.cursor = "grab";

      moveHandler = createMoveHandler(onMarkerMove, markerId);
      upHandler = createMoveHandler(onMarkerUp, markerId);

      map.on("mousemove", moveHandler);
      map.once("mouseup", upHandler);
    });
  };

  const onMarkerMove = (
    e: (mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent) & mapboxgl.EventData,
    markerId: string
  ) => {
    if (!map) return;

    const canvas = map.getCanvasContainer();

    const coordinates = e.lngLat;

    canvas.style.cursor = "grabbing";

    const point: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [coordinates.lng, coordinates.lat],
          },
        },
      ],
    };

    const geoJsonSource = map.getSource(markerId) as GeoJSONSource;

    geoJsonSource.setData(point);
  };

  const onMarkerUp = (
    e: mapboxgl.MapMouseEvent & mapboxgl.EventData,
    markerId: string
  ) => {
    if (!map) return;

    const coordinates = e.lngLat;

    const movedMarkerIdx = waypoints.findIndex(({ id }) => id === markerId);

    setWaypoints((prev) => {
      const shallowWaypoints = [...prev];

      const [removedWaypoint] = shallowWaypoints.splice(movedMarkerIdx, 1);
      shallowWaypoints.splice(movedMarkerIdx, 0, {
        ...removedWaypoint,
        coordinates: [coordinates.lng, coordinates.lat],
      });

      return shallowWaypoints;
    });

    const canvas = map.getCanvasContainer();

    canvas.style.cursor = "";

    // Unbind mouse/touch events
    map.off("mousemove", moveHandler);
    map.off("touchmove", upHandler);
  };

  const createMoveHandler =
    (callback: any, markerId: string) => (event: any) => {
      callback(event, markerId);
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
