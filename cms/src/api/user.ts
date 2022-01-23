import User from '../page/User/User'
import instance, { BaseResponse } from './config'
export const fetchUserListApi = async (query: { phoneNumber: string, getList: boolean }) => {
    const res = await instance.get<BaseResponse<{ list: User[], total: number }>>('api_admin_client_user', { params: query })
    return res.data
}