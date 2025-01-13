"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import Image from "next/image";
import googleIcon from "@/public/icons8-google.svg";
import { useForm } from "react-hook-form"
import { Label } from "./ui/label";
import { toast } from "react-toastify";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"


const schema = yup.object({
  name: yup.string().required().matches(/^[a-zA-ZÀ-ÿ]+(\s[a-zA-ZÀ-ÿ]+)+$/),
  email: yup.string().required().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/),
  confirm: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/)
})


export default function CardRegister() {

  toast.dismiss("");

  interface IFormInput {
    name: string,
    email: string,
    password: string,
    confirm: string
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const password = watch("password");
  
  const onSubmit = async (data: IFormInput) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if(response.ok){
        toast.success("Cadastro realizado com sucesso")
        window.location.href = "/login";
      }
    } catch (error) {
      toast.error("Erro ao fazer cadastro. Tente novamente.");
      console.error("Erro:", error);
      console.log("Houve um erro no cadastro, tente novamente.", error);
    }
  };
    return (
      <div>
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
            <form onSubmit={handleSubmit(onSubmit)}>
          
              {/* Input Name */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="name">Nome Completo</Label>
                  </div>
                  <Input {...register("name")}
                    type="text"
                  />
                  <p>{errors.name?.message}</p>
                </div>

                {/* Input Email */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <Input {...register("email")}
                    type="email"

                  />
                  <p>{errors.email?.message}</p>
                </div>

                {/* Input Password */}
                <div className="grid gap-2 relative">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"

                  />
                  <p>{errors.password?.message}</p>
                </div>

                {/* Input Confirm Password */}
                <div className="grid gap-2 relative">
                  <div className="flex items-center">
                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
        
                  </div>
                  <Input
                    {...register("confirm")}
                    id="confirm"
                    type="password"
                  />
                  <p>{errors.confirm?.message}</p>
                </div>

                <div className="flexitems-center justify-center">
                  <div className="flex-col justify-center items-center">
                    <Button
                      type="submit"

                      className="w-full"
                    >
                      Cadastrar
                    </Button>
                    <p className="inline-flex items-center justify-center gap-2 h-10 px-4 py-1 w-full">
                      Já possui uma conta?
                    </p>
                    <Link href={"/login"}>
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
    );
  }

