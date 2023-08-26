import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import SigninForm from "./components/SigninForm";
import SignupForm from "./components/SignupForm";

export type ModalFlowType = "signin" | "signup";

interface AuthModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  ...restProps
}) => {
  const [modalFlow, setModalFlow] = useState<ModalFlowType>("signin");

  const isSignin = modalFlow === "signin";

  const changeModalFlow = (flow: ModalFlowType) => setModalFlow(flow);
  const handleModalClose = () => {
    onClose();
    setModalFlow("signin");
  };

  return (
    <Modal
      isCentered
      size={{ base: "full", md: "3xl" }}
      onClose={handleModalClose}
      {...restProps}
    >
      <ModalOverlay />
      <ModalContent bg="gray.900" p="8">
        <ModalHeader>{isSignin ? "Sign in" : "Sign up"}</ModalHeader>
        <ModalCloseButton top="12" right="12" />
        <ModalBody>
          {isSignin ? (
            <SigninForm
              changeModalFlow={changeModalFlow}
              onSignin={handleModalClose}
            />
          ) : (
            <SignupForm
              changeModalFlow={changeModalFlow}
              onSignup={handleModalClose}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
