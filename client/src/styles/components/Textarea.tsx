import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  border: "1px solid",
  borderColor: "brand.500",
  background: "initial",
  padding: `.875em`,

  _focusWithin: {
    borderColor: "blue.500",
  },
  _placeholder: {
    fontSize: "sm",
    color: "gray.300",
  },
  _invalid: {
    borderColor: "red.500",
  },
  _hover: {
    borderColor: "brand.500",
  },
});

export const Textarea = defineStyleConfig({
  variants: { outline },
});
