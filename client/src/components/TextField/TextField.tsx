import {
  Input,
  InputProps,
  Text,
  Textarea,
  TextareaProps,
  VStack,
} from "@chakra-ui/react";
import { forwardRef } from "react";

import ErrorMessage from "../ErrorMessage";

type InputType = "input" | "textarea";

type TextFieldProps = (InputProps | TextareaProps) & {
  label?: string;
  variant?: InputType;
  errors?: any;
};

export const TextField: React.FC<TextFieldProps> = forwardRef(
  ({ label, variant = "input", errors, ...restProps }, ref) => {
    const isInput = variant === "input";

    return (
      <VStack w="full" alignItems="flex-start">
        {label && (
          <Text as="span" fontSize="sm">
            {label}
          </Text>
        )}
        {isInput ? (
          <>
            <Input
              w="full"
              ref={ref}
              isInvalid={errors[restProps.name!]}
              {...(restProps as InputProps)}
            />
            {!!errors[restProps.name!] && (
              <ErrorMessage errors={errors} name={restProps.name!} />
            )}
          </>
        ) : (
          <Textarea ref={ref} {...(restProps as TextareaProps)} />
        )}
      </VStack>
    );
  }
);
