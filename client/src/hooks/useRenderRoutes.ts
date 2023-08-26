import { useEffect, useState } from "react";

import { RouteInterface } from "../types/route";

import { useAuthState } from "../context/AuthProvider/hooks";

export const useRenderRoutes = (fetchedRoutes: RouteInterface[]) => {
  const { user } = useAuthState();

  const [choosedRouteId, setChoosedRouteId] =
    useState<RouteInterface["id"]>("");
  const [renderRoutes, setRenderRoutes] = useState<RouteInterface[]>([]);

  useEffect(() => {
    if (fetchedRoutes) {
      const modifiedRoutes = fetchedRoutes.map((route) => {
        route.favorited = route.favorites.includes(user?.id ?? "");

        return route;
      });

      setRenderRoutes(modifiedRoutes);
    }
  }, [fetchedRoutes]);

  const handleChooseRoute = (id: RouteInterface["id"]) => {
    setChoosedRouteId(id);
  };
  const resetChoosedRoute = () => setChoosedRouteId("");

  return {
    choosedRouteId,
    renderRoutes,
    handleChooseRoute,
    resetChoosedRoute,
    setRenderRoutes,
  };
};
