export const verifyToken = async (token: string): Promise<Boolean> =>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/get-user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
      
          return response.ok;
        } catch (error) {
          console.error("Erro ao verificar token:", error);
          return false;
        }
}