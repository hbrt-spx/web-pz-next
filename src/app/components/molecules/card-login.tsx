"use client";
import { Button } from "@/src/app/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/components/molecules/card";
import { Input } from "@/src/app/components/atoms/input";
import { Label } from "@/src/app/components/atoms/label";
import Image from "next/image";
import Link from "next/link";
import googleIcon from "@/public/icons8-google.svg";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const schema = yup.object({
  email: yup.string().required("Preencha o campo email.").email("Formato de email não reconhecido."),

  password: yup.string().required("Preencha o campo password."),
})

export default function CardLogin() {

    interface IFormLogin{
      email: string,
      password: string
    }

  const {register, handleSubmit, watch, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  const password = watch("password");

  const onSubmit = async (data: IFormLogin) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if(response.ok){
        toast.success("Logando...")
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast.error("Erro ao tentar logar. Tente novamente.");
      console.error("Erro:", error);
      console.log("Falha ao tentar logar", error);
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
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register('email')}
                  id="email"
                  type="email"
                  placeholder="projectz@mail.com"
            
                />
                <p className="text-sm text-red-700">{errors.email?.message}</p>
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
                <Input {...register("password")}
                  id="password"
                  type="password"
                />
                <p className="text-sm text-red-700">{errors.password?.message}</p>
              </div>
              <Button type="submit" className="w-full">
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
