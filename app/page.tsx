"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Link from "next/link";
import logopz from "@/public/logo.jpg";
import googleIcon from "@/public/icons8-google.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hide from "@/public/hide.png"
import view from "@/public/view.png"
import { PasswordInput } from "@/components/ui/passInput";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    toast.dismiss("");

    const userData = { name, email, password };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      

      if (response.ok) {
        toast.success("Cadastro realizado com sucesso!");
        window.location.href = "/sign-in";
      } else {
        const data = await response.json();
        console.log("front", data.message)
        toast.error(data.message.join(", ") || "Error trying to register.");
      }
    } catch (error) {
      console.error("Error", error)
      toast.error("Error sending data.");
    }
  };
  return (
    <div className="flex h-screen w-screen">
      <div className="flex bg-black w-[50%] h-[100%] items-center justify-center">
        <Image src={logopz} alt="logo" />
      </div>
      <div className="inline-flex bg-black w-[50%] h-[100%] items-center justify-center">
        <div className=" items-center justify-center">
          <Card className="justify-center items-center mx-auto max-w-sm">
            <div className="flex justify-center items-center">
              <CardHeader className="flex items-center">
                <CardTitle className="text-2xl">Cadastro</CardTitle>
                <CardDescription>
                  Preencha os dados para concluir o seu cadastro.
                </CardDescription>
              </CardHeader>
            </div>

            <CardContent>
              <form>
                
                {/* Input Name */}
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="name">Nome Completo</Label>
                    </div>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Input Email */}
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>


                  {/* Input Password */}
                  <div className="grid gap-2 relative">
                    <div className="flex items-center">

                      <Label htmlFor="password">Senha</Label>
                      
                        <button
                          type="button"
                          className="absolute right-3 top-2/3 transform -translate-y-1/2"
                         onClick={() => setShowPassword((oldValue) => !oldValue)}
                        ></button>
                      
                    </div>
                    <PasswordInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    
                  </div>


                  {/* Input Confirm Password */}
                  <div className="grid gap-2 relative">
                    <div className="flex items-center">
                      <Label htmlFor="confirm-password">Confirmar Senha</Label>
                                      <button
                          type="button"
                          className="absolute right-3 top-2/3 transform -translate-y-1/2"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        ></button>
                      
                    </div>
                    <PasswordInput
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="flexitems-center justify-center">
                    <div className="flex-col justify-center items-center">
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full"
                      >
                        Cadastrar
                      </Button>
                      <p className="inline-flex items-center justify-center gap-2 h-10 px-4 py-1 w-full">
                        Já possui uma conta?
                      </p>
                      <Link href={"/sign-in"}>
                        <Button variant="outline" className="w-full">
                          Fazer Login
                        </Button>
                      </Link>

                      <p className="inline-flex items-center justify-center gap-2 h-10 px-4 py-1 w-full">
                        ou
                      </p>
                      <Button variant="outline" className="w-full">
                        <Image
                          className="w-[10%]"
                          src={googleIcon}
                          alt="google icon"
                        />
                        Acessar com Google
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
