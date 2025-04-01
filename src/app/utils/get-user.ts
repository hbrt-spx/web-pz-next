
interface GetUserResponse {
  data?: any;
  error?: string;
}

export const getUser = async (token: string, router: any): Promise<GetUserResponse> => {
  if (!token) {
    return { error: "Token não encontrado" };
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.sub;

  try {
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
      return { error: "Usuário não encontrado" };
    }

    const data = await response.json();
    return { data };
  } catch (err) {
    return { error: "Erro ao buscar usuário" };
  }
};
