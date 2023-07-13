import axios from "axios";
import { notification } from "antd";
import {BaseUrl} from "../constant/URLS";

const unauthorizedCode = [400, 401, 403];

const Interceptor = axios.create({
    baseURL: BaseUrl,
    timeout: 60000,
});

// Config
const TOKEN_PAYLOAD_KEY = "Authorization";
const AUTH_TOKEN = localStorage.getItem('token')

// API Request interceptor
Interceptor.interceptors.request.use(
    (config) => {
        const jwtToken = AUTH_TOKEN || null;
        if (jwtToken) {
            config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
        }

        return config;
    },
    (error) => {
        // Do something with request error here
        notification.error({
            message: "Error",
        });
        Promise.reject(error);
    }
);

Interceptor.interceptors.response.use(
    (response) => {

        return response.data;

    },
    (error) => {
        let notificationParam = {
            message: "",
        };

        // Remove token and redirect
        if (unauthorizedCode.includes(error.response.status)) {
            notificationParam.message = "Authentication Fail";
            notificationParam.description = "Please login again";
            //localStorage.removeItem(AUTH_TOKEN);
        }

        if (error.response.status === 404) {
            notificationParam.message = "Not Found";
        }
        if (error.response.status === 403) {
            notificationParam.message = "Utilisateur deja existe avec cette email";
        }
        if (error.response.status === 500) {
            notificationParam.message = "Internal Server Error";
        }

        if (error.response.status === 508) {
            notificationParam.message = "Time Out";
        }

        notification.error(notificationParam);

        return Promise.reject(error);
    }
);

export default Interceptor;
