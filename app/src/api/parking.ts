import { Parking } from '../page/Parking/Parking'
import instance, { BaseResponse } from './config'

export const fetchParkingListApi = async () => {
    const res = await instance.get<BaseResponse<Parking[]>>('/api/client/parking')
    return res.data
}