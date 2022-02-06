import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchMessageBoardApi } from '../../api/messageBoard'
import User from '../User/User'
export enum MessageType {
  Suggestion = 1,
  Complaint,
  Praise,
}
export type Message = {
  _id: number
  content: string
  type: MessageType
  user_id: number
} & User

const MessageBoard: React.FC = () => {
  const [tableData, setTableData] = useState<Message[]>([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const getMessage = useCallback(async () => {
    setLoading(true)
    const res = await fetchMessageBoardApi({ page }) // 获取留言板信息
    if (res.code === 0) {
      setTableData(res.data.list)
      setTotal(res.data.total)
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    getMessage()
  }, [getMessage])

  const columns = useMemo<ColumnsType<Message>>(
    () => [
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        width: 300,
        ellipsis: true,
        render(content: string) {
          return <span title={content}>{content}</span>
        },
      },
      {
        title: '发起人',
        dataIndex: 'username',
        key: 'username',
        render(_, record) {
          return record.user_id
            ? `${record.name} (${record.phoneNumber})`
            : '--'
        },
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render(type) {
          if (type === MessageType.Suggestion) {
            return '建议'
          } else if (type === MessageType.Praise) {
            return '表扬'
          } else if (type === MessageType.Complaint) {
            return '投诉'
          }
        },
      },
    ],
    []
  )
  return (
    <>
      <Table
        style={{ marginTop: 20 }}
        pagination={{
          current: page + 1,
          total,
          pageSize: 20,
          onChange: (page) => {
            setPage(page - 1)
          },
        }}
        loading={loading}
        columns={columns}
        dataSource={tableData}
      />
    </>
  )
}
export default MessageBoard
