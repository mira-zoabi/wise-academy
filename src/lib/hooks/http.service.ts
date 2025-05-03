import axios from "axios";

const API_ENDPOINT: any = process.env.NEXT_PUBLIC_API_ENDPOINT;

let config = { baseURL: `${API_ENDPOINT}`, };

const httpClient = axios.create(config);
const onRequest = async (req: any) => {
    return req;
};
const onResponse = async (req: any) => {
    return req;
};
const onResponseError = async (error: any) => {
    return Promise.reject(error);
};
httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponse, onResponseError);

export {API_ENDPOINT};
export default httpClient;