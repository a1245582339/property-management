import { AdminUserInfo } from '../page/Dashboard'
import { AuthResponse, LoginForm } from '../page/Login/Login'
import instance, { BaseResponse } from './config'

export const loginApi = async (body: LoginForm) => {
    const res = await instance.post<BaseResponse<AuthResponse>>('api_admin_token', body)
    return res.data
}

export const fetchAdminUserInfoApi = async () => {
    const res = await instance.get<BaseResponse<AdminUserInfo>>('api_admin_auth')
    return res.data
}

export const fetchAdminListApi = async (query: { name: string, page: number, count: number }) => {
    const res = await instance.get<BaseResponse<{ list: AdminUserInfo[], total: number }>>('api_admin_user', { params: query })
    return res.data
}

export const createAdminUserApi = async (body: AdminUserInfo & { password: string }) => {
    const res = await instance.post<BaseResponse<{}>>('api_admin_user', body)
    return res.data
}

export const deleteAdminUserApi = async (body: { _id: string }) => {
    const res = await instance.post<BaseResponse<{}>>('api_admin_delete_user', body)
    return res.data
}

export const editAdminUserApi = async (body: Partial<AdminUserInfo & { password: string }>) => {
    const res = await instance.post<BaseResponse<{}>>('api_admin_edit_user', body)
    return res.data
}

export const changePassword = async (body: { newPassword: string, oldPassword: string }) => {
    const res = await instance.post<BaseResponse<{}>>('api_admin_change_password', body)
    return res.data
}