import { useContext } from "react";

import { AuthContext } from "../AuthProvider";

export const useAuthState = () => {
  const state = useContext(AuthContext);

  if (state === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return state;
};
