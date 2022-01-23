import { Building, Room, Unit } from '../page/Room/Room'
import User from '../page/User/User'
import instance, { BaseResponse } from './config'

export const fetchBuildingApi = async () => {
  const res = await instance.get<BaseResponse<Building[]>>('api_building')
  return res.data
}

export const fetchUnitApi = async (query: { buildingId: string }) => {
  const res = await instance.get<BaseResponse<Unit[]>>('api_unit', {
    params: query,
  })
  return res.data
}

export const fetchRoomApi = async (query: { unitId: string }) => {
  const res = await instance.get<BaseResponse<Room[]>>('api_room', {
    params: query,
  })
  return res.data
}

export function fetchRoomUserApi(query: {
  phoneNumber: string
}): Promise<BaseResponse<{ building: Building; unit: Unit; room: Room }[]>>
export function fetchRoomUserApi(query: {
  roomId: string
}): Promise<BaseResponse<User[]>>
export async function fetchRoomUserApi(query: any) {
  const res = await instance.get('api_user_room', { params: query })
  return res.data
}

export const deleteRoomUserApi = async (body: {
  phoneNumber: string
  roomId: string
}) => {
  const res = await instance.post<BaseResponse<User[]>>(
    'api_delete_user_room',
    body
  )
  return res.data
}

export const addRoomUserApi = async (body: {
  phoneNumber: string
  roomId: string
}) => {
  const res = await instance.post<BaseResponse<{}>>('api_user_room', body)
  return res.data
}
