import { Button, Input, message, Modal, Switch, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createNoticeApi,
  fetchNoticeListApi,
  updateNoticeApi,
} from '../../api/notice'

export enum ShowStatus {
  Hide,
  Show,
}

export type Notice = {
  _id: number
  content: string
  show: ShowStatus
}
const { TextArea } = Input
const Notice: React.FC = () => {
  const [noticeData, setNoticeData] = useState<Notice[]>([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [content, setContent] = useState('')

  const getNoticeList = useCallback(async () => {
    setLoading(true)
    const res = await fetchNoticeListApi({ page })
    if (res.code === 0) {
      setNoticeData(res.data.list)
      setTotal(res.data.total)
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    getNoticeList()
  }, [getNoticeList])
  const onStatusChanged = async (notice: Notice, show: ShowStatus) => {
    await updateNoticeApi({
      _id: notice._id,
      show,
    })
    message.success('更新成功')
    getNoticeList()
  }
  const columns = useMemo<ColumnsType<Notice>>(
    () => [
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        ellipsis: true,
        render(content: string) {
          return <span title={content}>{content}</span>
        },
      },
      {
        title: '状态',
        dataIndex: 'show',
        render(show: ShowStatus) {
          return show === ShowStatus.Hide ? '未展示' : '已展示'
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        render(_, record) {
          return record.show === ShowStatus.Show ? (
            <Button
              onClick={() => {
                onStatusChanged(record, ShowStatus.Hide)
              }}
              type="primary"
              danger
            >
              关闭
            </Button>
          ) : (
            <Button
              onClick={() => {
                onStatusChanged(record, ShowStatus.Show)
              }}
              type="primary"
            >
              展示
            </Button>
          )
        },
      },
    ],
    [noticeData]
  )

  const onModalCancel = () => {
    setModalShow(false)
    setContent('')
  }
  const onCreateConfirm = async () => {
    if (!content.trim()) {
      message.warn('请输入公告内容')
    }
    const res = await createNoticeApi({ content })
    if (res.code === 0) {
      message.success('创建成功')
      setTotal(0)
      getNoticeList()
      onModalCancel()
    }
  }
  return (
    <>
      <Button
        onClick={() => {
          setModalShow(true)
        }}
        type="primary"
      >
        创建公告
      </Button>
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
        dataSource={noticeData}
      />
      <Modal
        title="创建公告"
        visible={modalShow}
        onCancel={onModalCancel}
        onOk={onCreateConfirm}
      >
        <TextArea
          onChange={(e) => {
            setContent(e.target.value)
          }}
        />
      </Modal>
    </>
  )
}
export default Notice
