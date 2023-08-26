import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { Button, Flex, HStack, Icon, IconButton } from "@chakra-ui/react";

import AuthModal from "../AuthModal";
import CreateRouteModal from "../CreateRouteModal";

import { useAuthState } from "../../context/AuthProvider/hooks";

import { METRICS } from "../../constants/metrics";

import Logo from "../Logo";

type ModalType = "createRoute" | "auth";

export const Header: React.FC = () => {
  const { user, signOut } = useAuthState();

  const [isCreateRouteModalOpen, setIsCreateRouteModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openModal = (modal: ModalType) => {
    if (modal === "createRoute") {
      setIsCreateRouteModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };
  const closeModal = (modal: ModalType) => {
    if (modal === "createRoute") {
      setIsCreateRouteModalOpen(false);
    } else {
      setIsAuthModalOpen(false);
    }
  };

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      p="6"
      h={METRICS.HEADER_HEIGHT}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      position="sticky"
      top="0"
      bg="#141414"
      zIndex={3}
    >
      <Logo />
      <HStack spacing="4">
        {!!user && (
          <Button
            size="sm"
            onClick={() => openModal("createRoute")}
            variant="outlined"
          >
            New route
          </Button>
        )}
        <IconButton
          aria-label="Auth"
          icon={<Icon as={CiLogin} />}
          p=".55em"
          onClick={() => (!!user ? signOut() : openModal("auth"))}
        />
      </HStack>

      <CreateRouteModal
        isOpen={isCreateRouteModalOpen}
        onClose={() => closeModal("createRoute")}
      />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => closeModal("auth")} />
    </Flex>
  );
};
