import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Skeleton } from "@chakra-ui/react";
import {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

import { MarkerInterface, useGoogleMap } from "./hooks";

import { METRICS } from "../../constants/metrics";
import { API_KEY, CENTER, CONTAINER_STYLE } from "./constants";

interface RouteMapProps {
  markers: MarkerInterface[];
  editable?: boolean;
  setMarkers?: Dispatch<SetStateAction<MarkerInterface[]>>;
  onDirectionsChange?: (directions: google.maps.DirectionsResult) => void;
}

export const RouteMap: React.FC<RouteMapProps> = memo(
  ({ markers, editable = true, setMarkers, onDirectionsChange }) => {
    const { isLoaded, onLoad, onUnmount, handleMapClick, handleMarkerClick } =
      useGoogleMap(API_KEY, markers, setMarkers);

    const count = useRef(0);

    const [directions, setDirections] =
      useState<google.maps.DirectionsResult | null>(null);

    useEffect(() => {
      if (directions && onDirectionsChange) {
        onDirectionsChange(directions);
      }
    }, [directions]);

    return isLoaded ? (
      <GoogleMap
        mapContainerStyle={CONTAINER_STYLE}
        center={CENTER}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={editable ? handleMapClick : undefined}
      >
        {!directions &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker}
              onClick={() => handleMarkerClick(index)}
            />
          ))}

        {markers.length >= 2 && (
          <DirectionsService
            options={{
              origin: markers[0],
              destination: markers[markers.length - 1],
              waypoints: markers.slice(1, -1).map((marker) => ({
                location: marker,
              })),
              optimizeWaypoints: true,
              travelMode: google.maps.TravelMode.WALKING,
            }}
            callback={(result) => {
              if (result && count.current < 2) {
                count.current += 1;

                setDirections(result);
              } else {
                count.current = 0;
              }
            }}
          />
        )}

        {directions && (
          <DirectionsRenderer
            options={{
              directions,
            }}
          />
        )}
      </GoogleMap>
    ) : (
      <Skeleton w="full" h={METRICS.MIN_MAP_HEIGHT} />
    );
  }
);
