import { API } from "../constants/api";

interface CredentialsInterface {
  email: string;
  password: string;
}

export const login = async (credentials: CredentialsInterface) => {
  try {
    const response = await fetch(`${API.AUTH}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: credentials,
      }),
    });

    const data = await response.json();

    if (data.statusCode >= 400) {
      throw new Error(data.error ?? data.message);
    }

    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error occured";

    throw message;
  }
};

export const signup = async (credentials: CredentialsInterface) => {
  try {
    const response = await fetch(`${API.AUTH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: credentials,
      }),
    });

    const data = await response.json();

    if (data.statusCode >= 400) {
      throw new Error(data.error ?? data.message);
    }

    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error occured";

    throw message;
  }
};
