import { Order, OrderStatus } from '../page/Order/Order'
import instance, { BaseResponse } from './config'
export const fetchOrderListApi = async (params: { page: number, status: OrderStatus }) => {
    const res = await instance.get<BaseResponse<{ total: number, list: Order[] }>>('/api/client/order', { params })
    return res.data
}


export const createOrderApi = async (body: { title: string, desc: string }) => {
    const res = await instance.post<BaseResponse<{}>>('/api/order', body)
    return res.data
}