import axios from "axios";
import { localStorageService } from "./localService";

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const TOKEN_CYBERSOFT = process.env.REACT_APP_CYBERSOFT_TOKEN;
let timeRequestMax;

const getAccessToken = () => {
    let userLogin = localStorageService.getUserLocal();
    if (userLogin) {
        return userLogin.accessToken;
    } else {
        return null;
    }
};
const getRequestConfig = () => {
    const config = {
        headers: {
            tokenByClass: TOKEN_CYBERSOFT,
        },
    };
    const accessToken = getAccessToken();
    if (accessToken) {
        config.headers.token = accessToken;
    }
    return config;
};
export const httpService = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * timeRequestMax,

    ...getRequestConfig(),
});

//Action can thiệp trước khi gọi request API
httpService.interceptors.request.use(
    function (config) {
        const accessToken = getAccessToken();
        if (accessToken) config.headers.token = accessToken;
        else delete httpService.defaults.headers.common.token;
        return config;
    },
    function (error) {
        console.log("error request interceptor: ", error);
        return Promise.reject(error);
    }
);
//Action can thiệp sau khi có request API trả về
httpService.interceptors.response.use(
    function (response) {
        // else delete httpService.defaults.headers.common.token;
        return response;
    },
    function (error) {
        console.log("error response interceptor: ", error);
        return Promise.reject(error);
    }
);
