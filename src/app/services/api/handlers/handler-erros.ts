import { toast } from "react-toastify"

interface Data {
    message: string
}

export interface ReponseErrorProps {    
    status: number,
    data: Data,
    message: string    
}

export interface HandlerErrorProps {
    messageError?: string,
    responseErrorProps: ReponseErrorProps
}

export function handlerError({messageError, responseErrorProps}: HandlerErrorProps){
    try {
        if(responseErrorProps.status === 401){
            toast.error('Falha na autenticação.')
            return
        }
        if(responseErrorProps.status === 403){
            toast.error('Acesso negado!')
            return
        }
        if(responseErrorProps.status === 400){
            if(messageError){
                toast.error(messageError)
            }
            return "Dados fornecidos são inválidos"
        }
    } catch (error) {
        toast.error('Serviço indisponivel.')
    }
}