import decode from "jwt-decode";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "react-query";

import Unauthorized from "../../components/Unauthorized";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  email: string;
  accessToken: string;
}

interface Token extends User {
  iat: number;
  exp: number;
}

interface AuthContextState {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  signOut: VoidFunction;
}

export const AuthContext = createContext<AuthContextState | undefined>(
  undefined
);

const getInitialState = () => {
  const token = localStorage.getItem("token") || "";

  if (!token) return null;

  const decodedToken = decode(token) as Token;

  return {
    email: decodedToken.email,
    id: decodedToken.id,
    accessToken: token,
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();

  const [user, setUser] = useState<User | null>(getInitialState);

  const toast = useToast();

  useEffect(() => {
    if (user) localStorage.setItem("token", user.accessToken);
  }, [user?.accessToken]);

  const signOut = () => {
    queryClient.clear();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {!!user ? children : <Unauthorized />}
    </AuthContext.Provider>
  );
};
