import Link from "next/link";
import "../app/globals.css";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import googleIcon from "@/public/icons8-google.svg";
import Image from "next/image";

export default function SignIn() {
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
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Acessar
              </Button>
              <Button variant="outline" className="w-full">
                 <Image
                          className="w-[10%]"
                          src={googleIcon}
                          alt="google icon"
                        />
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
