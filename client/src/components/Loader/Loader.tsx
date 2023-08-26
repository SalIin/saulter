import { Flex, Spinner } from "@chakra-ui/react";

import { METRICS } from "../../constants/metrics";

export const Loader: React.FC = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      h={`calc(100% - ${METRICS.HEADER_HEIGHT})`}
    >
      <Spinner size="xl" color="brand.500" />
    </Flex>
  );
};
