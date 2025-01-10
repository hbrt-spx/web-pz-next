
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardLogin from "./components/card-login";


export default function SignIn() {
  return (
   
      <div>
        <CardLogin />
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
  
  );
}
