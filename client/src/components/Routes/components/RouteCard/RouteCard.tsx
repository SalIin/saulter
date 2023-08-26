import { Card, Flex, HStack, Heading, Image, Text } from "@chakra-ui/react";

import LikeButton from "../LikeButton";

import { RouteInterface } from "../../../../types/route";

import LogoIcon from "../../../../assets/icons/logo_ic.svg";

interface RouteCardProps {
  id: string;
  title: string;
  shortDescription: string;
  length: string;
  favorited: boolean;
  onCardClick: (id: RouteInterface["id"]) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  id,
  title,
  shortDescription,
  length,
  favorited,
  onCardClick,
}) => {
  return (
    <Card onClick={() => onCardClick(id)}>
      <Flex alignItems="center">
        <HStack>
          <Image src={LogoIcon} alt="Route" w="8" />
          <Heading fontSize="xl">{title}</Heading>
        </HStack>
        <Text fontWeight="bold" ml="auto" mr="2">
          {length}
        </Text>
        <LikeButton mt="-1" favorited={favorited} routeId={id} />
      </Flex>
      <Text mt="4">{shortDescription}</Text>
    </Card>
  );
};
