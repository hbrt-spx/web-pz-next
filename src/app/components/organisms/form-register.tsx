import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/src/app/components/atoms/input";
import { Button } from "@/src/app/components/atoms/button";
import { toast } from "react-toastify";
import { InputPass } from "../molecules/input-password";
import { IFormRegister } from "../../types/forms";
import FormBase from "./form-base";
import { api } from "../../services/api";

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

function FormRegister() {
  const methods = useForm<IFormRegister>({
    resolver: yupResolver(schema),
  });

  async function ClickSubmit(data: IFormRegister) {
    const { confirm, ...userData } = data;
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAaaa");
    const response = await api({
      url: "users",
      method: "POST",
      body: userData,
      messageSuccess: "Cadastro realizado com sucesso.",
      messageError: "Erro ao fazer cadastro.",
    });
    return response;
  }

  return (
    <FormBase onSubmit={ClickSubmit}>
      <Input name="name" type="text" placeholder="Nome completo" />
      <Input name="email" type="email" placeholder="E-mail" />
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
      <Button
        type="submit"
        className="w-full mt-2 font-bold"
      >
        Cadastrar
      </Button>
    </FormBase>
  );
}

export default FormRegister;
