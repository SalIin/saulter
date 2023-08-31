import mapboxgl from "mapbox-gl";
import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { CENTER } from "./constants";

import { initMap } from "./utils";

import MarkerIcon from "../../assets/icons/marker_ic.svg";

import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmlsb2tyeW55dHNreWkiLCJhIjoiY2xseTZkcjQ0MDhtNjNkbWh3M3lydmpvYyJ9.0a-BByF9sOy1LfdlT2KX9g";

export const MapboxMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;

    initMap(map, mapContainer, CENTER, zoom);
  });

  return <Box ref={mapContainer} h="full" w="full" />;
};
