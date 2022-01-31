import { Notice } from '../page/Order/Order'
import instance, { BaseResponse } from './config'
export const fetchNoticeApi = async () => {
    const res = await instance.get<BaseResponse<Notice[]>>('/api/currNotice')
    return res.data
}