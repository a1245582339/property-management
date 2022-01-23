import User from '../page/User/User'
import instance, { BaseResponse } from './config'
export async function fetchUserListApi(query: {
  phoneNumber: string
  getList: true
}): Promise<BaseResponse<{ list: User[]; total: number }>>
export async function fetchUserListApi(query: {
  phoneNumber: string
}): Promise<BaseResponse<User>>
export async function fetchUserListApi(query: {
  phoneNumber: any
  getList?: any
}): Promise<any> {
  const res = await instance.get<BaseResponse<{ list: User[]; total: number }>>(
    'api_admin_client_user',
    { params: query }
  )
  return res.data
}
