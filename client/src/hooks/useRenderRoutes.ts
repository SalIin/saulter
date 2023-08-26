import { useEffect, useState } from "react";

import { RouteInterface } from "../types/route";

export const useRenderRoutes = (fetchedRoutes: RouteInterface[]) => {
  const [choosedRouteId, setChoosedRouteId] =
    useState<RouteInterface["id"]>("");
  const [renderRoutes, setRenderRoutes] = useState<RouteInterface[]>([]);

  useEffect(() => {
    setRenderRoutes(fetchedRoutes);
  }, []);

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
