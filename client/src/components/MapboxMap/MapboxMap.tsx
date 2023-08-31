import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { useMap } from "./hooks/useMap";

import { getRoute } from "./utils";

import { MapboxMapProps } from "./types";

import "mapbox-gl/dist/mapbox-gl.css";

export const MapboxMap: React.FC<MapboxMapProps> = ({ onRouteChange }) => {
  const {
    map,
    mapContainer,
    waypoints,
    initMap,
    initListeners,
    paintMarkers,
    paintRoute,
  } = useMap();

  useEffect(() => {
    if (!map) {
      initMap();
    } else {
      initListeners();
    }
  }, [map]);

  useEffect(() => {
    if (waypoints.length) {
      paintMarkers();
    }

    if (waypoints.length >= 2) {
      getRoute(waypoints).then((route) => {
        paintRoute(route);
        onRouteChange(route.distance);
      });
    }
  }, [waypoints]);

  return <Box ref={mapContainer} h="full" w="full" />;
};
