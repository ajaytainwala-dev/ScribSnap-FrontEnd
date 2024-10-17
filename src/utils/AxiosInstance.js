import axios from "axios";
const AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 10000,
    headers: {
        "Content-type": "application/json"
    }
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem("auth-token");
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosInstance;