import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    p: 7,
    bg: "gray.900",
    color: "white",
  },
  header: {
    p: 0,
  },
  body: {
    p: 0,
  },
  footer: {
    p: 0,
  },
});

const sm = definePartsStyle({
  container: {
    py: "10px",
    px: "30px",
  },
});

const xs = definePartsStyle({
  container: {
    py: "10px",
    px: "10px",
  },
});

export const Card = defineMultiStyleConfig({ baseStyle, sizes: { xs, sm } });
