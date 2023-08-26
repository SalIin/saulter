import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

import { METRICS } from "../../constants/metrics";

const PX = "1.25em";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const outlined = definePartsStyle({
  field: {
    border: "1px solid",
    borderColor: "brand.500",
    background: "initial",
    padding: `.875em ${PX}`,
    pr: "2.5em",
    lineHeight: "shorter",

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
  },
});

const md = definePartsStyle({
  field: {
    height: METRICS.INPUT_HEIGHT,
    fontSize: "md",
  },
  element: {
    right: PX,
    width: "auto",
  },
});

export const Input = defineMultiStyleConfig({
  variants: { outlined },
  sizes: { md },
  defaultProps: {
    variant: "outlined",
    size: "md",
  },
});
