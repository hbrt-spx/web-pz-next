"use client";
import { Button } from "@/src/app/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/components/templates/card";
import { Input } from "@/src/app/components/atoms/input";
import { Label } from "@/src/app/components/atoms/label";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { LoginBtnGoogle } from "../molecules/login-btn-google";
import { InputPass } from "../molecules/input-password";
import { LabelForgotPass } from "../molecules/label-forgotpass";

const schema = yup.object({
  email: yup
    .string()
    .required("Preencha o campo email.")
    .email("Formato de email não reconhecido."),

  password: yup.string().required("Preencha o campo password."),
});

export default function CardLogin() {
  interface IFormLogin {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const password = watch("password");

  const onSubmit = async (data: IFormLogin) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast.success("Logando...");
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
            {/* FORM LOGIN */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="projectz@mail.com"/>
              <p className="text-sm text-red-700">{errors.email?.message}</p>
    
              <LabelForgotPass htmlFor="password">Senha</LabelForgotPass>
              <InputPass type="password"/>
              <p className="text-sm text-red-700">{errors.password?.message}</p>

              <Button type="submit" className="w-full mt-3">
                Acessar
              </Button>
            </form>
            <p className="inline-flex items-center justify-center gap-2 h-10 px-4 py-1 w-full">
              ou
            </p>
            <LoginBtnGoogle variant="outline" className="w-full" />
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
