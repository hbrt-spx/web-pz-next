import axios from "./axios";
import { handlerParams } from "./handlers/handler-params";
import { handlerError, ReponseErrorProps } from "./handlers/handler-erros";
import { toast } from "react-toastify";

interface RequestProps {
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body?: object,
  headers?: Record<string, string>;
  params?: object,
  messageError?: string
  messageSuccess?: string
}

async function request({ url, method, body, params, messageError, messageSuccess }: RequestProps) {
  try {
    const response = await axios.request({
      method,
      url: handlerParams(url, params),
      data: body,
    });
    if(messageSuccess){
        toast.success(messageSuccess)
    }
    return response.data
  } catch (error) {
    handlerError({responseErrorProps: error as ReponseErrorProps, messageError})
  }
}

export default request
