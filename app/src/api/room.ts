import { Room } from '../page/Room/Room'
import instance, { BaseResponse } from './config'

export const fetchRoomListApi = async () => {
    const res = await instance.get<BaseResponse<Room[]>>('/api/userRoom')
    return res.data
}