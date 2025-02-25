import React from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/src/app/components/atoms/input";
import { Button } from "@/src/app/components/atoms/button";
import { InputPass } from "../molecules/input-password";
import Cookie from "js-cookie";
import { LabelForgotPass } from "../molecules/label-forgotpass";
import { toast } from "react-toastify";
import FormBase from "./form-base";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("E-mail é obrigatório."),
  password: yup
    .string()
    .min(6, "Senha deve ter no mínimo 8 caracteres")
    .required("Senha é obrigatória.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/, {
      message:
        "A senha precisa conter pelo menos 1 número, 1 letra maiuscula, 1 letra minuscula e um caractere especial e no minimo 8 caracteres.",
    }),
});

interface IFormLogin {
  email: string;
  password: string;
}
function FormLogin() {
  const methods = useForm<IFormLogin>({
    resolver: yupResolver(schema),
  });

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

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message) {
          toast.error(errorData.message);
        } else {
          toast.error("Erro ao autenticar. Tente novamente.");
        }
        return;
      }

      const userData = await response.json();

      if (userData?.access_token) {
        Cookie.set("token", userData.access_token);
        window.location.href = "/dashboard";
      } else {
        console.error("Token não encontrado na resposta");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <FormBase onSubmit={onSubmit}>
      <Input name="email" type="email" placeholder="E-mail" />
      <InputPass name="password" type="password" placeholder="Senha" />
      <LabelForgotPass />
      <Button type="submit" className="w-full mt-2">
        Acessar
      </Button>
    </FormBase>
  );
}

export default FormLogin;
