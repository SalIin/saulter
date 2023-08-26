import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { List, ListItem, VStack } from "@chakra-ui/react";

import Searchbar from "./components/Searchbar";
import RouteCard from "./components/RouteCard";

import { useSearch } from "./hooks/useSearch";

import { RouteInterface } from "../../types/route";

import { METRICS } from "../../constants/metrics";
import { useQueryClient } from "react-query";

interface RoutesProps {
  routes: RouteInterface[];
  onRouteSelected: (id: RouteInterface["id"]) => void;
  setRenderRoutes: Dispatch<SetStateAction<RouteInterface[]>>;
}

export const Routes: React.FC<RoutesProps> = ({
  routes,
  onRouteSelected,
  setRenderRoutes,
}) => {
  const queryClient = useQueryClient();

  const initialRoutes = queryClient.getQueryData<RouteInterface[]>("routes");

  const { searchString, handleSearchStringChange } = useSearch(
    initialRoutes ?? [],
    setRenderRoutes
  );

  return (
    <VStack
      spacing={METRICS.ROUTES_SPACING}
      w={{ base: "100%", lg: "50%" }}
      h="full"
    >
      <Searchbar value={searchString} onChange={handleSearchStringChange} />
      <VStack as={List} spacing="4" w="full" justifyContent="flex-start">
        {routes
          .sort((a, b) => Number(b.favorited) - Number(a.favorited))
          .map((route) => (
            <ListItem
              key={route.id}
              w="full"
              cursor="pointer"
              transition="opacity 0.3s ease-in-out"
              _hover={{ opacity: "0.8" }}
            >
              <RouteCard onCardClick={onRouteSelected} {...route} />
            </ListItem>
          ))}
      </VStack>
    </VStack>
  );
};
