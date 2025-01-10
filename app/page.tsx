import Image from "next/image";
import logopz from "@/public/logo.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardRegister from "./components/card-register";

export default function SignUp() {
  
  ;
  return (
    <div className="flex h-screen w-screen">
      <div className="hidden lg:flex h-full bg-black w-[90%] items-center justify-center">
        <Image src={logopz} alt="logo" />
      </div>
      <div className="inline-flex bg-black justify-center items-center w-full h-full lg:bg-cover lg:bg-center relative">
        <div className=" items-center justify-center">
        <CardRegister />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
