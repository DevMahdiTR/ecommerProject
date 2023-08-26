import axios from "axios";
import { notification } from "antd";
import {BaseUrl} from "../constant/URLS";
import {setLoader} from "../../redux/action/loaderAction";
import store from "../../redux/store";


const unauthorizedCode = [400, 401, 403];

const Interceptor = axios.create({
    baseURL: BaseUrl,
    timeout: 60000,
});



// API Request interceptor
Interceptor.interceptors.request.use(
    (config) => {
        const jwtToken = localStorage.getItem('token') || null;
        if (jwtToken) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }
        store.dispatch(setLoader(true));

        return config;
    },
    (error) => {
        // Do something with request error here
        console.log(error)
        store.dispatch(setLoader(false));

        notification.error({
            message: "Error",
        });
        Promise.reject(error);
    }
);

Interceptor.interceptors.response.use(
    (response) => {
        store.dispatch(setLoader(false));
        return response.data;

    },
    (error) => {
        let notificationParam = {
            message: "",
        };
        console.log(error)

        // Remove token and redirect
        if (unauthorizedCode.includes(error.response.status)) {
            notificationParam.message = "Échec de l'authentification";
            notificationParam.description = "Veuillez vous reconnecter";
            //localStorage.removeItem(AUTH_TOKEN);
            store.dispatch(setLoader(false));

        }

        if (error.response.status === 404) {
            notificationParam.message = "Pas trouvé\n";
            store.dispatch(setLoader(false));

        }
        if (error.response.status === 403) {
            notificationParam.message = "Il faut connecter a ton compte d'abord";
            store.dispatch(setLoader(false));

        }
        if (error.response.status === 500) {
            notificationParam.message = "Internal Server Error";
            store.dispatch(setLoader(false));

        }

        if (error.response.status === 508) {
            notificationParam.message = "Time Out";
            store.dispatch(setLoader(false));

        }

        notification.error(notificationParam);

        return Promise.reject(error);
    }
);

export default Interceptor;
