import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: 500,
    _disabled: {
      pointerEvents: "none",
    },
    _active: {
      transform: "scale(0.95)",
    },
  },
  variants: {
    solid: {
      background: "brand.500",
      color: "white",
      border: "1px solid",
      borderColor: "brand.500",

      _hover: {
        background: "transparent",
        color: "brand.500",
      },
      _active: {
        background: "transparent",
      },
    },
    outlined: {
      background: "transparent",
      color: "brand.500",
      border: "1px solid",
      borderColor: "brand.500",

      _hover: {
        background: "brand.500",
        color: "white",
      },
    },
    danger: {
      background: "transparent",
      color: "red.500",
      border: "1px solid",
      borderColor: "red.500",

      _hover: {
        background: "red.500",
        color: "white",
      },
    },
    text: {
      background: "transparent",
      color: "brand.500",
      p: 0,

      _hover: {
        color: "white",
      },
    },
    textInverted: {
      background: "transparent",
      color: "blue.500",
      p: 0,

      _hover: {
        color: "gray.600",
      },
    },
  },
  sizes: {
    lg: {
      p: ".6em 1.7em",
      fontSize: "lg",
      height: "auto",
      minWidth: "auto",
    },
    md: {
      p: ".9em 2.5em",
      fontSize: "md",
      height: "auto",
      minWidth: "auto",
    },
    sm: {
      p: ".6em 1.7em",
      fontSize: "sm",
      height: "auto",
      minWidth: "auto",
    },
    xs: {
      p: ".4em 1.8em",
      fontSize: "xs",
      height: "auto",
      minWidth: "auto",
    },
  },
  defaultProps: {
    variant: "solid",
    size: "md",
  },
});
