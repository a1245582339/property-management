import { Notice, ShowStatus } from '../page/Notice/Notice'
import instance, { BaseResponse } from './config'

export const fetchNoticeListApi = async (query: { page: number }) => {
  const res = await instance.get<
    BaseResponse<{ list: Notice[]; total: number }>
  >('/api/notice', {
    params: query,
  })
  return res.data
}

export const updateNoticeApi = async (body: {
  _id: number
  show: ShowStatus
}) => {
  const res = await instance.put<BaseResponse<{}>>('/api/notice', body)
  return res.data
}

export const createNoticeApi = async (body: { content: string }) => {
  const res = await instance.post<BaseResponse<{}>>('/api/notice', body)
  return res.data
}
