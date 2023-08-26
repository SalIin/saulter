import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";

import { deleteRoute } from "../http/route";

import { RouteInterface } from "../types/route";

export const useDeleteRoute = (routeId: RouteInterface["id"]) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteRoute, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["routes"],
        (oldData: RouteInterface[] | undefined) => {
          if (oldData) {
            const updatedRouteIdx = oldData.findIndex(
              (route) => route.id === routeId
            );

            const shallowCopyOfRoutes = [...oldData];

            shallowCopyOfRoutes.splice(updatedRouteIdx, 1);

            return shallowCopyOfRoutes;
          }

          return [];
        }
      );

      toast({
        title: "Route deleted",
        description: `Route has been successfully deleted`,
        status: "success",
      });
    },
    onError: () => {
      toast({
        title: "Failed",
        description: "Something went wrong, please try again later",
        status: "error",
      });
    },
  });

  return { mutate, isLoading };
};
