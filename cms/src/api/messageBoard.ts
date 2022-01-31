import { Message } from '../page/MessageBoard/MessageBoard'
import instance, { BaseResponse } from './config'

export const fetchMessageBoardApi = async (query: { page: number }) => {
  const res = await instance.get<
    BaseResponse<{ list: Message[]; total: number }>
  >('/api/message')
  return res.data
}
