import instance, { BaseResponse } from './config'

export const fetchOccupancyApi = async () => {
  const res = await instance.get('/api/statistics/occupancy')
  return res.data
}
