import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { Progress } from "../atoms/progress";
import Cookie from "js-cookie";
import { api } from "../../services/api";

interface UserProfileProps {
  token: string;
}

const UserProfile = ({ token }: UserProfileProps) => {
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookie.get("token");
      if (!token) {
        setError("Token não foi encontrado");
        setLoading(false);
        return;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      const userId = decodedToken.sub;
      try {
        const response = await api({
          url: `users/${userId}`,
          method: 'GET'
        });

        if (!response) {
          throw new Error("Token expirado ou inválido");
        }       

        const userDetailsData = await response;
        setUserDetails(userDetailsData);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, setUser]);

  if (loading) {
    return <Progress />;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      {userDetails && (
        <p>
          <strong>Bem vindo: </strong> {userDetails.name}
        </p>
      )}
    </div>
  );
};

export default UserProfile;
