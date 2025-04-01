import Cookie from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
}

export const validateToken = async (): Promise<User> => {
  const token = Cookie.get("token");
  if (!token) {
    throw new Error("Token não encontrado");
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.sub;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Usuário não encontrado");
  }

  return await response.json();
};
