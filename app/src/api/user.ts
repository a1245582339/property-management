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