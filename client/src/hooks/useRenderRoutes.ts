import { useState } from "react";
import { useQuery } from "react-query";

import { RouteInterface } from "../types/route";

import { getAllRoutes } from "../http/route";

import { useAuthState } from "../context/AuthProvider/hooks";

export const useRenderRoutes = () => {
  const { user } = useAuthState();

  const { isLoading } = useQuery<RouteInterface[]>(
    "routes",
    () => getAllRoutes(user?.accessToken ?? ""),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: !!user,
      onSuccess: (data) => {
        const transformedRoutes = data.map((route) => {
          route.favorited = route.favorites.includes(user?.id ?? "");
          return route;
        });

        setRenderRoutes(transformedRoutes);
      },
    }
  );

  const [choosedRouteId, setChoosedRouteId] =
    useState<RouteInterface["id"]>("");
  const [renderRoutes, setRenderRoutes] = useState<RouteInterface[] | null>(
    null
  );

  const handleChooseRoute = (id: RouteInterface["id"]) => {
    setChoosedRouteId(id);
  };
  const resetChoosedRoute = () => setChoosedRouteId("");

  return {
    isLoading,
    choosedRouteId,
    renderRoutes,
    handleChooseRoute,
    resetChoosedRoute,
    setRenderRoutes,
  };
};
