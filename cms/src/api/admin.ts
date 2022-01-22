import { AdminUserInfo } from '../page/Dashboard'
import { AuthResponse, LoginForm } from '../page/Login/Login'
import instance from './config'

export const loginApi = async (body: LoginForm) => {
    const res = await instance.post<AuthResponse>('api_admin_token', body)
    return res.data
}

export const fetchAdminUserInfoApi = async () => {
    const res = await instance.get<AdminUserInfo>('api_admin_auth')
    return res.data
}