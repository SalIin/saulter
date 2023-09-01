import {
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";

import RouteMap from "../RouteMap";

import { useDeleteRoute } from "../../hooks/useDeleteRoute";
import { useToggleFavoriteRoute } from "../../hooks/useToggleFavoriteRoute";

import { RouteInterface } from "../../types/route";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useAuthState } from "../../context/AuthProvider/hooks";
import MapboxMap from "../MapboxMap";

interface RouteDetailsProps extends RouteInterface {
  onNavigateBack: VoidFunction;
}

export const RouteDetails: React.FC<RouteDetailsProps> = ({
  id,
  title,
  length,
  description,
  markers,
  favorited,
  author,
  onNavigateBack,
}) => {
  const { user } = useAuthState();
  const { mutate: mutateRouteLike } = useToggleFavoriteRoute(id, favorited);
  const { mutate: mutateRouteDelete, isLoading: isRouteDeleting } =
    useDeleteRoute(id);

  const handleLikeRoute = () => {
    mutateRouteLike({ routeId: id, token: user?.accessToken ?? "" });
  };

  const handleDeleteRoute = () => {
    mutateRouteDelete({ routeId: id, token: user?.accessToken ?? "" });
  };

  const displayDeleteButton = author === user!.id;

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" w="full">
        <IconButton
          p="2"
          aria-label="Like button"
          icon={
            <ArrowBackIcon color="white" transition="all 0.3s ease-in-out" />
          }
          variant="outlined"
          _hover={{ svg: { color: "brand.500", bg: "transparent" } }}
          onClick={onNavigateBack}
        />
        <Heading mr="auto" ml="4">
          {title}
        </Heading>
        <Heading color="brand.500">{length}</Heading>
      </Flex>
      <Text>{description}</Text>
      <MapboxMap initialMarkers={markers} editable={false} />
      <HStack w="full">
        <Button
          w={displayDeleteButton ? "50%" : "100%"}
          onClick={handleLikeRoute}
        >
          {favorited ? "Remove from favorites" : "Add to favorites"}
        </Button>
        {displayDeleteButton && (
          <Button
            w="50%"
            variant="danger"
            onClick={handleDeleteRoute}
            isLoading={isRouteDeleting}
          >
            Delete
          </Button>
        )}
      </HStack>
    </>
  );
};
