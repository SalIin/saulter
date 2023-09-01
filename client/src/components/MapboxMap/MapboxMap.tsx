import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { useMap } from "./hooks/useMap";

import { getRoute } from "./utils";

import { MapboxMapProps } from "./types";

import { METRICS } from "../../constants/metrics";

import "mapbox-gl/dist/mapbox-gl.css";

export const MapboxMap: React.FC<MapboxMapProps> = ({
  editable = true,
  initialMarkers = [],
  onRouteChange,
}) => {
  const {
    map,
    mapContainer,
    waypoints,
    initMap,
    initListeners,
    paintMarkers,
    paintRoute,
  } = useMap(initialMarkers, editable);

  // Initial map
  useEffect(() => {
    if (!map) {
      initMap();
    } else {
      editable && initListeners();
    }
  }, [map]);

  // Reinit map on choosed route change
  useEffect(() => {
    if (initialMarkers.length) initMap();
  }, [initialMarkers]);

  useEffect(() => {
    if (waypoints.length) {
      paintMarkers();
    }

    if (waypoints.length >= 2) {
      getRoute(waypoints).then((route) => {
        paintRoute(route);

        const formattedWaypoints = waypoints.map(({ coordinates }) => ({
          lng: coordinates[0],
          lat: coordinates[1],
        }));

        !!onRouteChange && onRouteChange(route.distance, formattedWaypoints);
      });
    }
  }, [waypoints]);

  return (
    <Box ref={mapContainer} h="full" w="full" minH={METRICS.MIN_MAP_HEIGHT} />
  );
};
