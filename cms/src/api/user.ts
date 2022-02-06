import User from '../page/User/User'
import instance, { BaseResponse } from './config'
export async function fetchUserListApi(query: {
  phoneNumber: string
  page: number
  getList: true
}): Promise<BaseResponse<{ list: User[]; total: number }>>
export async function fetchUserListApi(query: {
  phoneNumber: string
  page: number
}): Promise<BaseResponse<User>>
export async function fetchUserListApi(query: {
  phoneNumber: any
  getList?: any
  page: any
}): Promise<any> {
  const res = await instance.get<BaseResponse<{ list: User[]; total: number }>>(
    '/api/client/userList',
    { params: query }
  )
  return res.data
}
