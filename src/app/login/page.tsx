'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import CardLogin from "../components/templates/card-login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Progress } from "../components/atoms/progress";
import { verifyToken } from "../utils/auth";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookie.get('token');
    
    if (token) {
      const checkToken = async () => {
       const isValidToken = await verifyToken(token)

       if(isValidToken){
        router.push('/dashboard')
       } else {
        setLoading(false)
       }          
      };
      checkToken();
    } else {     
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Progress/>;
  }

  return (
    <div>
      <CardLogin />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
