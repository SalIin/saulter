import { useState } from "react";
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";

import Header from "../Header";
import AuthModal from "../AuthModal";

import { METRICS } from "../../constants/metrics";

import WelcomeImage from "../../assets/images/welcome.svg";

export const Unauthorized: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Box h="full">
      <Header />
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        h={`calc(100% - ${METRICS.HEADER_HEIGHT})`}
      >
        <Image src={WelcomeImage} alt="Unauthorized" w="40vmin" />
        <Heading as="h1" my="4">
          Sign in to access the app
        </Heading>
        <Button size="sm" onClick={openModal}>
          Sign in
        </Button>

        <AuthModal isOpen={isModalOpen} onClose={closeModal} />
      </Flex>
    </Box>
  );
};
