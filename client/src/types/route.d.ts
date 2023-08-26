import { MarkerInterface } from "../components/RouteMap/hooks";

export interface RouteInterface {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  length: string;
  favorited: boolean;
  favorites: string[];
  markers: MarkerInterface[];
  author: string;
}

export interface CreateRouteBodyInterface {
  route: Omit<RouteInterface, "id" | "favorites" | "author">;
  token: string;
}

export interface ToogleFavoriteRouteBodyInterface {
  routeId: RouteInterface["id"];
  token: string;
}

export interface DeleteRouteBodyInterface
  extends ToogleFavoriteRouteBodyInterface {}
