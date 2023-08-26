import { useQuery } from "react-query";
import { Container, Flex, VStack, useBreakpointValue } from "@chakra-ui/react";

import Routes from "../Routes";
import Loader from "../Loader";
import EmptyRoutes from "../EmptyRoutes";
import RouteDetails from "../RouteDetails";

import { METRICS } from "../../constants/metrics";

import { RouteInterface } from "../../types/route";

import { getAllRoutes } from "../../http/route";

import { useAuthState } from "../../context/AuthProvider/hooks";
import { useRenderRoutes } from "../../hooks/useRenderRoutes";

export const Content: React.FC = () => {
  const layout = useBreakpointValue({ base: "mobile", lg: "desktop" });

  const {
    isLoading,
    choosedRouteId,
    renderRoutes,
    handleChooseRoute,
    resetChoosedRoute,
    setRenderRoutes,
  } = useRenderRoutes();

  if (isLoading || !renderRoutes) return <Loader />;

  if (!renderRoutes.length) return <EmptyRoutes />;

  const route = renderRoutes.find(({ id }) => id === choosedRouteId);
  const isMobile = layout === "mobile";

  const renderMobileLayout = () => {
    if (route) {
      return (
        <VStack
          spacing={METRICS.ROUTES_SPACING}
          w={{ base: "100%", lg: "50%" }}
          alignItems="flex-start"
        >
          {route && (
            <RouteDetails onNavigateBack={resetChoosedRoute} {...route} />
          )}
        </VStack>
      );
    }

    return (
      <Routes
        routes={renderRoutes}
        setRenderRoutes={setRenderRoutes}
        onRouteSelected={handleChooseRoute}
      />
    );
  };

  return (
    <Container as="main" maxW="full" px="6" py={METRICS.CONTAINER_Y_PADDING}>
      {isMobile ? (
        renderMobileLayout()
      ) : (
        <Flex
          gap="10"
          h="100%"
          alignItems="flex-start"
          overflow="hidden"
          flexDir={{ base: "column", lg: "row" }}
        >
          <Routes
            routes={renderRoutes}
            setRenderRoutes={setRenderRoutes}
            onRouteSelected={handleChooseRoute}
          />
          <VStack
            spacing={METRICS.ROUTES_SPACING}
            w={{ base: "100%", lg: "50%" }}
            alignItems="flex-start"
          >
            {route && (
              <RouteDetails onNavigateBack={resetChoosedRoute} {...route} />
            )}
          </VStack>
        </Flex>
      )}
    </Container>
  );
};
