import { Parking } from '../page/Parking/Parking'
import instance, { BaseResponse } from './config'
export const fetchParkingApi = async (query: {
  phoneNumber: string
  page: number
  empty?: boolean
}) => {
  const res = await instance.get<
    BaseResponse<{ list: Parking[]; total: number }>
  >('/api/parking', { params: query })
  return res.data
}

export const deleteParkingApi = async (query: { _id: number }) => {
  const res = await instance.delete<BaseResponse<{}>>('/api/parking', {
    params: query,
  })
  return res.data
}

export const createParkingApi = async (body: { parkingCode: string }) => {
  const res = await instance.post<BaseResponse<{}>>('/api/parking', body)
  return res.data
}

export const updateParkingApi = async (body: {
  _id: number
  carNumber: string | null
  userId: number | null
}) => {
  const res = await instance.put<BaseResponse<{}>>('/api/parking', body)
  return res.data
}
