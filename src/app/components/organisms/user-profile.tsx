import { useEffect, useState } from "react"
import { useUserStore } from "../../stores/userStore"
import { Progress } from "../atoms/progress"

interface UserProfileProps {
    token: string
}

const UserProfile = ({token}: UserProfileProps) => {
    const {setUser} = useUserStore()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [userDetails, setUserDetails] = useState<any>(null)

    useEffect(()=>{
        const fetchUserData = async ()=>{
            if(!token){
                setError("Token não foi encontrado")
                setLoading(false)
                return
            }

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/get-user`,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
          
                  if (!response.ok) {
                    throw new Error("Token expirado ou inválido");
                  }

                  const data = await response.json()
                  setUser(data)

                  const userId = data.sub

                  const userResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  if (!userResponse.ok){
                    throw new Error("Error ao recuperar detalhes do usuário")
                  }

                  const userDetailsData = await userResponse.json()
                  setUserDetails(userDetailsData)
                  setLoading(false)
                } catch (error: any) {
                    setError(error.message)
                    setLoading(false)                
            }
        }

        fetchUserData()
    }, [token, setUser])


    if (loading){
        return <Progress/>
    }

    if (error) {
        return <div>Erro: {error}</div>
    }

    return (
        <div>
      {userDetails && (
        <p>
          <strong>Bem vindo: </strong> {userDetails.name}
        </p>
      )}
    </div>
    )
}

export default UserProfile