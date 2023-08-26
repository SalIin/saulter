import { Text } from "@chakra-ui/react";
import { ErrorMessage as ChakraErrorMessage } from "@hookform/error-message";

interface ErrorMessageProps {
  errors: any;
  name: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, name }) => {
  return (
    <Text fontSize="sm" color="red.500">
      <ChakraErrorMessage errors={errors} name={name} />
    </Text>
  );
};
