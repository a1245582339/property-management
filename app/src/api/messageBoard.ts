import { MessageType } from '../page/Me/MessageBoard'
import instance, { BaseResponse } from './config'

export const sendMessageBoardApi = async (body: { content: string, type: MessageType }) => {
    const res = await instance.post<BaseResponse<{}>>('/api/message', body)
    return res.data
}