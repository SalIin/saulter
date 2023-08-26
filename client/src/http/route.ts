// @ts-nocheck

import { API } from "../constants/api";

import {
  CreateRouteBodyInterface,
  DeleteRouteBodyInterface,
  ToogleFavoriteRouteBodyInterface,
} from "../types/route";

export const createRoute = async (
  createRouteBody: CreateRouteBodyInterface
) => {
  try {
    const res = await fetch(API.ROUTES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${createRouteBody.token}`,
      },
      body: JSON.stringify({ route: createRouteBody.route }),
    });

    const data = await res.json();

    if (data.statusCode >= 400) {
      throw new Error(data.error ?? data.message);
    }

    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error occured";

    throw message;
  }
};

export const getAllRoutes = async (token: string, currentUserId: string) => {
  try {
    const res = await fetch(API.ROUTES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.statusCode >= 400) {
      throw new Error(data.error ?? data.message);
    }

    const modifiedRoutes = data.map((route) => {
      route.favorited = route.favorites.includes(currentUserId);
      return route;
    });

    return modifiedRoutes;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error occured";

    throw message;
  }
};

export const toggleFavoriteRoute = async ({
  routeId,
  token,
}: ToogleFavoriteRouteBodyInterface) => {
  try {
    const res = await fetch(`${API.ROUTES}/${routeId}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.statusCode >= 400) {
      throw new Error(data.error ?? data.message);
    }

    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error occured";

    throw message;
  }
};

export const deleteRoute = async ({
  routeId,
  token,
}: DeleteRouteBodyInterface) => {
  try {
    const res = await fetch(`${API.ROUTES}/${routeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.statusCode >= 400) {
      throw new Error(data.error ?? data.message);
    }

    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error occured";

    throw message;
  }
};
