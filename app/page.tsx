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

export default function SignUp() {
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
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="name">Nome Completo</Label>
                  </div>
                  <Input id="name" type="name" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <Input id="email" type="email" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="confirm-password">Confimar senha</Label>
                  </div>
                  <Input
                    id="confirm-password"
                    type="confirm-password"
                    required
                  />
                </div>
                <div className="flexitems-center justify-center">
                  <div className="flex-col justify-center items-center">
                    <Button type="submit" className="w-full">
                      Cadastrar
                    </Button>
                    <p className="inline-flex items-center justify-center gap-2 h-10 px-4 py-1 w-full">
                      Já possui uma conta?
                    </p>
                    <Link href={"/sign-in"}>
                      <Button variant="outline" className="w-full">
                        Fazer login
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
