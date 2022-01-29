import { Building, Room, Unit } from '../page/Room/Room'
import User from '../page/User/User'
import { UserRoom } from '../page/User/UserRoomModal'
import instance, { BaseResponse } from './config'

export const fetchBuildingApi = async () => {
  const res = await instance.get<BaseResponse<Building[]>>('/api/building')
  return res.data
}

export const fetchUnitApi = async (query: { buildingId: number }) => {
  const res = await instance.get<BaseResponse<Unit[]>>('/api/unit', {
    params: query,
  })
  return res.data
}

export const fetchRoomApi = async (query: { unitId: number }) => {
  const res = await instance.get<BaseResponse<Room[]>>('/api/room', {
    params: query,
  })
  return res.data
}

export const addBuildingApi = async (body: { num: string }) => {
  const res = await instance.post<BaseResponse<{}>>('/api/building', body)
  return res.data
}
export const addUnitApi = async (body: { num: string; buildingId: number }) => {
  const res = await instance.post<BaseResponse<{}>>('/api/unit', body)
  return res.data
}
export const addRoomApi = async (body: { num: string; unitId: number }) => {
  const res = await instance.post<BaseResponse<{}>>('/api/room', body)
  return res.data
}

export const delBuildingApi = async (query: { _id: number }) => {
  const res = await instance.delete<BaseResponse<{}>>('/api/building', {
    params: query,
  })
  return res.data
}
export const delUnitApi = async (query: { _id: number }) => {
  const res = await instance.delete<BaseResponse<{}>>('/api/unit', {
    params: query,
  })
  return res.data
}
export const delRoomApi = async (query: { _id: number }) => {
  const res = await instance.delete<BaseResponse<{}>>('/api/room', {
    params: query,
  })
  return res.data
}

export function fetchRoomUserApi(query: {
  userId: number
}): Promise<BaseResponse<UserRoom[]>>
export function fetchRoomUserApi(query: {
  roomId: number
}): Promise<BaseResponse<User[]>>
export async function fetchRoomUserApi(query: any) {
  const res = await instance.get('/api/userRoom', { params: query })
  return res.data
}

export const deleteRoomUserApi = async (query: {
  userId: number
  roomId: number
}) => {
  const res = await instance.delete<BaseResponse<User[]>>('api/userRoom', {
    params: query,
  })
  return res.data
}

export const addRoomUserApi = async (body: {
  userId: number
  roomId: number
}) => {
  const res = await instance.post<BaseResponse<{}>>('api/userRoom', body)
  return res.data
}
