import { useState } from "react";
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import Form from "./components/Form";
import RouteMap from "../RouteMap";

import { MarkerInterface } from "../RouteMap/hooks";

interface CreateRouteModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const CreateRouteModal: React.FC<CreateRouteModalProps> = (props) => {
  const [routeLength, setRouteLength] = useState<number>(0);
  const [markers, setMarkers] = useState<MarkerInterface[]>([]);

  const resetRoute = () => {
    setMarkers([]);
    setRouteLength(0);
  };
  const calcTotalDistance = (directions: google.maps.DirectionsResult) => {
    const distanceInMeters = directions.routes[0].legs.reduce(
      (acc, { distance }) => acc + distance!.value ?? 0,
      0
    );

    const distanceInKilometers = distanceInMeters / 1000;

    setRouteLength(distanceInKilometers);
  };

  return (
    <Modal
      isCentered
      size={{ base: "full", md: "4xl", lg: "6xl" }}
      onCloseComplete={resetRoute}
      {...props}
    >
      <ModalOverlay />
      <ModalContent bg="gray.900" p="8">
        <ModalHeader>Add new route</ModalHeader>
        <ModalCloseButton top="12" right="12" />
        <ModalBody>
          <Flex gap="8" flexDir={{ base: "column-reverse", md: "row" }}>
            <Form
              routeLength={routeLength}
              markers={markers}
              onRouteCreate={props.onClose}
            />
            <Box flexGrow={{ base: 0, md: 1 }}>
              <RouteMap
                markers={markers}
                setMarkers={setMarkers}
                onDirectionsChange={calcTotalDistance}
              />
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
