import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/src/app/components/atoms/input";
import { Label } from "@/src/app/components/atoms/label";
import { Button } from "@/src/app/components/atoms/button";
import { toast } from "react-toastify";

const schema = yup.object({
  name: yup
    .string()
    .required("Nome completo é obrigatório.")
    .matches(/^[a-zA-ZÀ-ÿ]+(\s[a-zA-ZÀ-ÿ]+)+$/, {
      message: "É necessário nome e sobrenome.",
    }),
  email: yup.string().email("Email inválido").required("Email é obrigatório."),
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
    .required("Confirmar senha é obrigatório."),
});

interface IFormRegister {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

const FormRegister: React.FC = () => {
  const methods = useForm<IFormRegister>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormRegister) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
        <Label htmlFor="name">Nome Completo</Label>
        <Input
          type="text"
          placeholder="Nome Completo"
          autoComplete="name"
          {...methods.register("name")}
        />
        <p className="text-sm text-red-700">
          {methods.formState.errors.name?.message}
        </p>

        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="mail@mail.com"
          autoComplete="email"
          {...methods.register("email")}
        />
        <p className="text-sm text-red-700">
          {methods.formState.errors.email?.message}
        </p>

        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          placeholder="Senha"
          {...methods.register("password")}
        />
        <p className="text-sm text-red-700">
          {methods.formState.errors.password?.message}
        </p>

        <Label htmlFor="confirm-password">Confirmar Senha</Label>
        <Input
          type="password"
          placeholder="Confirmar Senha"
          {...methods.register("confirm")}
        />
        <p className="text-sm text-red-700">
          {methods.formState.errors.confirm?.message}
        </p>

        <Button type="submit" className="w-full mt-2">
          Cadastrar
        </Button>
      </form>
    </FormProvider>
  );
};

export default FormRegister;
