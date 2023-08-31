import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import MarkerIcon from "../../assets/icons/marker_ic.svg";

import { useMap } from "./hooks/useMap";

import "mapbox-gl/dist/mapbox-gl.css";
import { getRoute } from "./utils";

export const MapboxMap: React.FC = () => {
  const { map, mapContainer, waypoints, initMap, initListeners, paintMarkers } =
    useMap();

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
      getRoute(waypoints);
    }
  }, [waypoints]);

  return <Box ref={mapContainer} h="full" w="full" />;
};
