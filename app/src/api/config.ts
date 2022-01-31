import axios from 'axios'
const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
})
// request拦截器
instance.interceptors.request.use(
    config => config,
    error => error,
);

// response拦截器
instance.interceptors.response.use(
    response => response,
    (error) => {
        if (error?.response?.status === 401) {
            location.href = `${location.origin}/#/login`
        }
        throw error
    },
);
export type BaseResponse<T> = {
    code: number
    data: T
}

export default instance;