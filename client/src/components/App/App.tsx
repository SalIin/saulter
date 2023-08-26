import "@fontsource-variable/montserrat";

import { Box } from "@chakra-ui/react";

import Header from "../Header";
import Content from "../Content";

import AuthProvider from "../../context/AuthProvider";

export const App = () => {
  return (
    <AuthProvider>
      <Box h="full">
        <Header />
        <Content />
      </Box>
    </AuthProvider>
  );
};
