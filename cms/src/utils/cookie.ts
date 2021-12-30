import Cookies from 'js-cookie'

export const setToken = (token: string) => {
    Cookies.set('Authorization', token, { expires: 7 });
}

export const getToken = () => {
    return Cookies.get('Authorization')
}

export const delToken = () => {
    Cookies.remove('Authorization');
}