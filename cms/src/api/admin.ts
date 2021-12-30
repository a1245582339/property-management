import instance from './config'

export const login = (body: {tel: string, password: string}) => {
    instance.post('admin_token', body)
}