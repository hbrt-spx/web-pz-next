"use client";
import Link from "next/link";
import { Button } from "@/src/app/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { LoginBtnGoogle } from "../molecules/login-btn-google";
import FormRegister from "../organisms/form-register";

export default function CardRegister() {
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
         <FormRegister />
          <p className="inline-flex items-center justify-center gap-2 h-10 px-4 py-1 w-full">
            {" "}
            Já possui uma conta?
          </p>
          <Link href={"/login"}>
            <Button variant="outline" className="w-full ">
              Fazer Login
            </Button>
          </Link>

          <p className="inline-flex items-center justify-center gap-2 h-10 px-4 py-1 w-full">
            ou
          </p>
          <LoginBtnGoogle variant="outline" className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
