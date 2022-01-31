import { Order, OrderStatus } from '../page/Order/Order'
import instance, { BaseResponse } from './config'

export const fetchOrderListApi = async (query: {
  phoneNumber: string
  page: number
  status?: OrderStatus
}) => {
  const res = await instance.get<
    BaseResponse<{ list: Order[]; total: number }>
  >('/api/admin/order', { params: query })
  return res.data
}

export const updateOrderApi = async (body: {
  _id: number
  status: OrderStatus
}) => {
  const res = await instance.put<BaseResponse<{}>>('/api/order', body)
  return res.data
}
