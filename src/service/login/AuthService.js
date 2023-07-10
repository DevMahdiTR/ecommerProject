import {APIS, BaseUrl} from "../../config/constant/URLS";
import fetch from '../../config/interceptor/interceptor'



export const LoginService = (data)=>{
    return fetch({
        method: "post",
        url: BaseUrl+ APIS.AUTH.login,
        data
    })
}
export const RegisterService = (data)=>{
    return fetch({
        method: "post",
        url: BaseUrl+ APIS.AUTH.register,
        data
    })
}
export const logout = () => {
    localStorage.clear();
};
