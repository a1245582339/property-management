import { UserInfo } from '../page/Me/Me'
import instance, { BaseResponse } from './config'

export const loginApi = async (body: { phoneNumber: string }) => {
    const res = await instance.post<BaseResponse<{}>>('/api/client/login', body)
    return res.data
}

export const fetchUserInfoApi = async () => {
    const res = await instance.get<BaseResponse<UserInfo>>('/api/client/user')
    return res.data
}
export const updateUserInfoApi = async (body: { avatar?: string, name?: string }) => {
    const res = await instance.put<BaseResponse<{}>>('/api/client/user', body)
    return res.data
}

export const logoutApi = async () => {
    const res = await instance.post<BaseResponse<{}>>('/api/client/logout')
    return res.data
}

export const uploadFileApi = async (file: File) => {
    const form = new FormData()
    form.append('file', file)
    console.log(form.get('file'))
    const res = await instance.post<BaseResponse<{ url: string }>>('/api/file', form)
    return res.data
}