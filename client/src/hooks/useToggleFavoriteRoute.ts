import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";

import { toggleFavoriteRoute } from "../http/route";

import { RouteInterface } from "../types/route";

export const useToggleFavoriteRoute = (
  routeId: RouteInterface["id"],
  favorited: boolean
) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(toggleFavoriteRoute, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["routes"],
        (oldData: RouteInterface[] | undefined) => {
          if (oldData) {
            const updatedRouteIdx = oldData.findIndex(
              (route) => route.id === routeId
            );

            const shallowCopyOfRoutes = [...oldData];

            shallowCopyOfRoutes.splice(updatedRouteIdx, 1, data);

            return shallowCopyOfRoutes;
          }

          return [data];
        }
      );
    },
    onError: () => {
      toast({
        title: "Failed",
        description: "Something went wrong, please try again later",
        status: "error",
      });
    },
  });

  return { isLoading, mutate };
};
