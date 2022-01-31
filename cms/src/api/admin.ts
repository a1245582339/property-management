import { AdminUserInfo } from '../page/Dashboard'
import { AuthResponse, LoginForm } from '../page/Login/Login'
import instance, { BaseResponse } from './config'

export const loginApi = async (body: LoginForm) => {
  const res = await instance.post<BaseResponse<AuthResponse>>(
    '/api/admin/login',
    body
  )
  return res.data
}

export const fetchAdminUserInfoApi = async () => {
  const res = await instance.get<BaseResponse<AdminUserInfo>>('/api/admin/info')
  return res.data
}

export const fetchAdminListApi = async (query: {
  name: string
  page: number
  count: number
}) => {
  const res = await instance.get<
    BaseResponse<{ list: AdminUserInfo[]; total: number }>
  >('/api/admin/user', { params: query })
  return res.data
}

export const createAdminUserApi = async (
  body: AdminUserInfo & { password: string }
) => {
  const res = await instance.post<BaseResponse<{}>>('/api/admin/user', body)
  return res.data
}

export const deleteAdminUserApi = async (query: { _id: number }) => {
  const res = await instance.delete<BaseResponse<{}>>('/api/admin/user', {
    params: query,
  })
  return res.data
}

export const editAdminUserApi = async (
  body: Partial<AdminUserInfo & { password: string }>
) => {
  const res = await instance.put<BaseResponse<{}>>('/api/admin/user', body)
  return res.data
}

export const changePasswordApi = async (body: {
  newPassword: string
  oldPassword: string
}) => {
  const res = await instance.put<BaseResponse<{}>>('/api/admin/password', body)
  return res.data
}

export const logoutApi = async () => {
  const res = await instance.post<BaseResponse<{}>>('/api/admin/logout')
  return res.data
}
