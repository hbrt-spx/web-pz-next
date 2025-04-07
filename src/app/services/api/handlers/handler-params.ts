export function handlerParams(url: string, params?: object){
    if(params){
    const formatedParams = Object.keys(params).reduce((acc, key)=>{
        if(acc){
            return `${acc}&${key}=${params[key as keyof typeof params]}`
        }
        return `${key}=${params[key as keyof typeof params]}`

    }, '')    
    return `${url}?${formatedParams}`
    }
    return url
}