import { Box, Heading } from "@chakra-ui/react";

export const Logo: React.FC = () => {
  return (
    <Heading color="brand.500" userSelect="none">
      Saul
      <Box as="span" color="white">
        ter
      </Box>
    </Heading>
  );
};
