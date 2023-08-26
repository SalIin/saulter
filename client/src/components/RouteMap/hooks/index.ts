import { useJsApiLoader } from "@react-google-maps/api";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

export interface MarkerInterface extends google.maps.LatLngLiteral {}

export const useGoogleMap = (
  apiKey: string,
  markers: MarkerInterface[],
  setMarkers?: Dispatch<SetStateAction<MarkerInterface[]>>
) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
    if (setMarkers) setMarkers([]);
  }, []);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng || !setMarkers) return;

    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };

  const handleMarkerClick = (markerIndex: number) => {
    if (!setMarkers) return;

    const updatedMarkers = markers.filter((_, index) => index !== markerIndex);
    setMarkers(updatedMarkers);
  };

  return {
    isLoaded,
    onLoad,
    onUnmount,
    handleMapClick,
    handleMarkerClick,
  };
};
