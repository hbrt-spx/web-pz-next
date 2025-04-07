import Axios, { InternalAxiosRequestConfig } from 'axios'
import Cookie from 'js-cookie'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,  
})

axios.interceptors.request.use((config: InternalAxiosRequestConfig)=>{
    const token = Cookie.get("token")
    if(!token){
        return config
    }  

    config.headers.Authorization= `Bearer ${token}`  

    return config 
})

export default axios