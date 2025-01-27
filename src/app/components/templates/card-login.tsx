"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/components/templates/card";
import Link from "next/link";
import { LoginBtnGoogle } from "../molecules/login-btn-google";
import FormLogin from "../organisms/form-login";



export default function CardLogin() {
  

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
            <FormLogin />
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
