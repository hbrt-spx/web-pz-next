'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import CardLogin from "../components/templates/card-login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Progress } from "../components/atoms/progress";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookie.get('token');
    
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/get-user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            router.push('/dashboard');
          } else {           
            setLoading(false);
          }
        } catch (err) {
        
          setLoading(false);
        }
      };

      verifyToken();
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
