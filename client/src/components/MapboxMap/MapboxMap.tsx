import mapboxgl from "mapbox-gl";

import { CENTER } from "./constants";

import MarkerIcon from "../../assets/icons/marker_ic.svg";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmlsb2tyeW55dHNreWkiLCJhIjoiY2xseTZkcjQ0MDhtNjNkbWh3M3lydmpvYyJ9.0a-BByF9sOy1LfdlT2KX9g";

export const MapboxMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(CENTER[0]);
  const [lat, setLat] = useState(CENTER[1]);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      // @ts-ignore
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return <Box ref={mapContainer} h="full" w="full" />;
};
