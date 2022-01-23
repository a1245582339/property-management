import { Building, Room, Unit } from '../page/Room/Room'
import instance, { BaseResponse } from './config'

export const fetchBuildingApi = async () => {
    const res = await instance.get<BaseResponse<Building[]>>('api_building')
    return res.data
}

export const fetchUnitApi = async (query: { buildingId: string }) => {
    const res = await instance.get<BaseResponse<Unit[]>>('api_unit', { params: query })
    return res.data
}

export const fetchRoomApi = async (query: { unitId: string }) => {
    const res = await instance.get<BaseResponse<Room[]>>('api_room', { params: query })
    return res.data
}