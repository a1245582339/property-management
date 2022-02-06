import { Button, Input, message, Popover, Radio, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchOrderListApi, updateOrderApi } from '../../api/order'
import { timestampToDate } from '../../utils/time'
import User from '../User/User'
export enum OrderStatus {
  Created = 1,
  Dealed,
  Complete,
}
export type Order = {
  _id: number
  title: string
  desc: string
  create_time: number
  deal_time: number
  complete_time: number
  status: OrderStatus
  user_id: number
} & User

const { Search } = Input

const Order: React.FC = () => {
  const [tableData, setTableData] = useState<Order[]>([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [changeStatusLoading, setChangeStatusLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [currentStatus, setCurrentStatus] = useState<OrderStatus | 0>(0)

  const getOrderList = useCallback(async () => {
    setLoading(true)
    const statusObj = currentStatus === 0 ? {} : { status: currentStatus }
    const res = await fetchOrderListApi({ phoneNumber, page, ...statusObj })
    if (res.code === 0) {
      setTableData(res.data.list)
      setTotal(res.data.total)
      setLoading(false)
    }
  }, [page, phoneNumber, currentStatus])
  useEffect(() => {
    getOrderList()
  }, [getOrderList])
  const onStatusButtonClick = async (order: Order) => {
    setChangeStatusLoading(true)
    await updateOrderApi({ _id: order._id, status: order.status + 1 })
    setPage(0)
    message.success('流转成功')
    setChangeStatusLoading(false)
    getOrderList()
  }
  const columns = useMemo<ColumnsType<Order>>(
    () => [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '内容',
        dataIndex: 'desc',
        key: 'desc',
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
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render(status) {
          if (status === OrderStatus.Created) {
            return '已发起'
          } else if (status === OrderStatus.Dealed) {
            return '已处理'
          } else if (status === OrderStatus.Complete) {
            return '已结单'
          }
        },
      },
      {
        title: '流转时间',
        dataIndex: 'time',
        key: 'time',
        render(_, record) {
          if (record.status === OrderStatus.Created) {
            return timestampToDate(record.create_time)
          } else if (record.status === OrderStatus.Dealed) {
            return timestampToDate(record.deal_time)
          } else if (record.status === OrderStatus.Complete) {
            return timestampToDate(record.complete_time)
          }
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render(_, record) {
          return (
            <>
              {record.status === OrderStatus.Complete ? (
                '--'
              ) : (
                <Popover
                  content={
                    <div>
                      <Button
                        size="small"
                        type="primary"
                        loading={changeStatusLoading}
                        onClick={() => {
                          onStatusButtonClick(record)
                        }}
                      >
                        确定
                      </Button>
                    </div>
                  }
                  title={`确定流转此工单？`}
                  trigger="click"
                >
                  <Button style={{ marginLeft: 4 }} size="small" type="primary">
                    流转
                  </Button>
                </Popover>
              )}
            </>
          )
        },
      },
    ],
    []
  )
  return (
    <>
      <Search
        placeholder="请输入手机号搜索"
        style={{ width: 300 }}
        onSearch={(value) => setPhoneNumber(value)}
      />
      <Radio.Group
        style={{ marginLeft: 30 }}
        value={currentStatus}
        onChange={(e) => {
          setCurrentStatus(e.target.value)
        }}
      >
        <Radio.Button value={0}>全部</Radio.Button>
        <Radio.Button value={OrderStatus.Created}>已发起</Radio.Button>
        <Radio.Button value={OrderStatus.Dealed}>已处理</Radio.Button>
        <Radio.Button value={OrderStatus.Complete}>已结单</Radio.Button>
      </Radio.Group>
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
export default Order
