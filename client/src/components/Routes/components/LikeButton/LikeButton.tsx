import { StarIcon } from "@chakra-ui/icons";
import { ButtonProps, IconButton, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";

import { toggleFavoriteRoute } from "../../../../http/route";

import { RouteInterface } from "../../../../types/route";
import { useToggleFavoriteRoute } from "../../../../hooks/useToggleFavoriteRoute";
import { useAuthState } from "../../../../context/AuthProvider/hooks";

interface LikeButtonProps extends ButtonProps {
  favorited?: boolean;
  routeId: RouteInterface["id"];
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  routeId,
  favorited = false,
  ...restProps
}) => {
  const { user } = useAuthState();
  const { mutate } = useToggleFavoriteRoute(routeId, favorited);

  const iconColor = favorited ? "brand.500" : "gray.500";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate({
      routeId,
      token: user?.accessToken ?? "",
    });
  };

  return (
    <IconButton
      p="2"
      aria-label="Like button"
      icon={<StarIcon color={iconColor} transition="all 0.3s ease-in-out" />}
      variant="text"
      _hover={{ svg: { color: "brand.500", bg: "transparent" } }}
      {...restProps}
      onClick={handleClick}
    />
  );
};
