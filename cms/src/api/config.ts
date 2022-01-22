import axios from 'axios'
const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
})

export type BaseResponse<T> = {
    code: number
    data: T
    msg: string
}
const whiteList = ['/login']
// request拦截器
instance.interceptors.request.use(
    config => {
        // if (getToken() && getToken() !== 'undefined') {
        //     config.headers!.Authorization = `Bearer ${getToken()}`
        // } else if (whiteList.indexOf(window.location.pathname) === -1) {
        //     window.location.pathname = 'login'
        // }
        return config
    },
    error => error,
);

// response拦截器
instance.interceptors.response.use(
    response => response,
    (error) => {
        if (error.response.status === 401) {
            // window.location.pathname = 'login'
        }
        throw error
    },
);


export default instance;