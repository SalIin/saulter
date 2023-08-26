import { useState } from "react";
import { Button, Flex, Heading, Image } from "@chakra-ui/react";

import CreateRouteModal from "../CreateRouteModal";

import { METRICS } from "../../constants/metrics";

import EmptyStateImage from "../../assets/images/empty.svg";

export const EmptyRoutes: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      h={`calc(100% - ${METRICS.HEADER_HEIGHT})`}
    >
      <Image src={EmptyStateImage} alt="No routes" w="40vmin" />
      <Heading as="h1" my="4">
        No routes found
      </Heading>
      <Button size="sm" onClick={openModal}>
        Try to add new one
      </Button>

      <CreateRouteModal isOpen={isModalOpen} onClose={closeModal} />
    </Flex>
  );
};
