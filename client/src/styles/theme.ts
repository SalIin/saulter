import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";
import { fonts } from "./fonts";
import { components } from "./components";

const theme = {
  colors,
  fonts,
  components,
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      "html, body, #root": {
        height: "100%",
      },
      body: {
        color: "white",
        bg: "black",
      },
      [`@media screen and (max-width: ${props.theme.breakpoints.xl})`]: {
        html: {
          fontSize: "14px",
        },
      },
      [`@media screen and (max-width: ${props.theme.breakpoints.md})`]: {
        html: {
          fontSize: "12px",
        },
      },
    }),
  },
};

export default extendTheme(theme);
