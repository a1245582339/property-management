import { Parking } from '../page/Parking/Parking'
import instance, { BaseResponse } from './config'
export const fetchParkingApi = async (query: {
  phoneNumber: string
  page: number
}) => {
  const res = await instance.get<
    BaseResponse<{ data: Parking[]; total: number }>
  >('', { params: query })
  return res.data
}

export const deleteParkingApi = async (query: { _id: string }) => {
  const res = await instance.delete<BaseResponse<{}>>('', { params: query })
  return res.data
}

export const createParkingApi = async (body: { parkingCode: string }) => {
  const res = await instance.post<BaseResponse<{}>>('', body)
  return res.data
}

export const updateParkingApi = async (body: {
  carNumber: string
  phoneNumber: string
}) => {
  const res = await instance.put<BaseResponse<{}>>('', body)
  return res.data
}
