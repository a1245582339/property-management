import {
  Occupancy,
  OrderStatistics,
  ParkingStatistics,
} from '../page/Home/Home'
import instance, { BaseResponse } from './config'

export const fetchOccupancyApi = async () => {
  const res = await instance.get<BaseResponse<Occupancy[]>>(
    '/api/statistics/occupancy'
  )
  return res.data
}
export const fetchParkingStatisticsApi = async () => {
  const res = await instance.get<BaseResponse<ParkingStatistics[]>>(
    '/api/statistics/parking'
  )
  return res.data
}
export const fetchOrderStatisticsApi = async () => {
  const res = await instance.get<BaseResponse<OrderStatistics[]>>(
    '/api/statistics/order'
  )
  return res.data
}
