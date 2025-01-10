"use client";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import googleIcon from "@/public/icons8-google.svg";

import { useState } from "react";
import { toast } from "react-toastify";

export default function CardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.dismiss("");

    const userData = { email, password };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.access_token) {
          toast.success("Logando...");
          localStorage.setItem("token", data.token);
          console.log("Token armazenado:", localStorage.getItem("token"));
          window.location.href = "/dashboard";
        } else {
          toast.error("Erro ao fazer login. Tente novamente.");
        }
      } else {
        const data = await response.json();
        toast.error(data.message.join(", ") || "Erro ao tentar logar.");
      }
    } catch (error) {
      toast.error("Os campos precisam ser preenchidos corretamente.");
    }
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[url(/logo.jpg)] bg-center  bg-no-repeat">
      <div>
        <Card className="mx-auto max-w-sm bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Use seu email e senha para acessar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="projectz@mail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" onClick={handleSubmit} className="w-full">
                Acessar
              </Button>
              <Button variant="outline" className="w-full">
                <Image className="w-[10%]" src={googleIcon} alt="google icon" />
                Acessar com Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Não possui uma conta?{" "}
              <Link href="/" className="underline">
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
