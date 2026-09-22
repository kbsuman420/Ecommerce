import axios from "axios";

const getAccessToken = () => null;
const onAuthFailure = () => {};
let onTokenRefreshed = () => {};


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});


api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

let isRefreshing = false;
let pendingRequests = [];

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const failedRequest = error.config;
        if( error.response.status !== 401 || failedRequest._retry) {
            return Promise.reject(error);
        }

        if(isRefreshing) {
            return new Promise((resolve, reject) => {
                pendingRequests.push({resolve, reject});
            }).then((newToken) => {
                failedRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(failedRequest);
            })
        }

        failedRequest._retry = true;
        isRefreshing = true;

        try{
            const { data } = await api.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh` {}, { withCredentials: true });
            const newToken = data.accessToken;

            onTokenRefreshed(newToken);

            failedRequest.headers.Authorization = `Bearer ${newToken}`;

            pendingRequests.forEach(({resolve, reject}) => {
                resolve(newToken);
            });

            return api(failedRequest);
        } catch (refreshError) {
            pendingRequests.forEach(({resolve, reject}) => {
                reject(refreshError);
            });
            onAuthFailure();
            return Promise.reject(refreshError);
        }

    }
)


export default api;