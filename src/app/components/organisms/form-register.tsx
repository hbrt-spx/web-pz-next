import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/src/app/components/atoms/input";
import { Label } from "@/src/app/components/atoms/label";
import { Button } from "@/src/app/components/atoms/button";
import { toast } from "react-toastify";
import { InputPass } from "../molecules/input-password";

const schema = yup.object({
  name: yup
    .string()
    .required("Nome completo é obrigatório.")
    .matches(/^[a-zA-ZÀ-ÿ]+(\s[a-zA-ZÀ-ÿ]+)+$/, {
      message: "É necessário nome e sobrenome.",
    }),
  email: yup.string().email("Email inválido").required("E-mail é obrigatório."),
  password: yup
    .string()
    .min(6, "Senha deve ter no mínimo 8 caracteres")
    .required("Senha é obrigatória.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/, {
      message:
        "A senha precisa conter pelo menos 1 número, 1 letra maiuscula, 1 letra minuscula e um caractere especial e no minimo 8 caracteres.",
    }),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("Campo de preenchimento obrigatório."),
});

interface IFormRegister {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

function FormRegister() {
  const methods = useForm<IFormRegister>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormRegister) => {
    const { confirm, ...userData } = data;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        toast.success("Cadastro realizado com sucesso");
        window.location.href = "/login";
      }
    } catch (error) {
      toast.error("Erro ao fazer cadastro. Tente novamente.");
      console.error("Erro:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          name="name"
          type="text"
          placeholder='Nome completo'
        />
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
        />
        <InputPass
          name="password"
          type="password"
          placeholder="Digite sua senha"
        />
        <InputPass
          name="confirm"
          type="password"
          placeholder="Repita a sua senha"
        />
        <Button type="submit" className="w-full mt-2">
          Cadastrar
        </Button>
      </form>
    </FormProvider>
  );
}

export default FormRegister;
