import { Empty, InfiniteScroll, List, NavBar, Selector } from 'antd-mobile'
import { SelectorOption } from 'antd-mobile/es/components/selector'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { fetchOrderListApi } from '../../api/order'
import { useSelector, useDispatch } from '../../store'
import { timestampToDate } from '../../utils/time'

export enum OrderStatus {
  Created = 1,
  Dealed,
  Complete,
}

export type Order = {
  complete_time: number
  create_time: number
  deal_time: number
  desc: string
  status: OrderStatus
  title: string
  user_id: number
  _id: number
}
const options: SelectorOption<number>[] = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '已创建',
    value: OrderStatus.Created,
  },
  {
    label: '已处理',
    value: OrderStatus.Dealed,
  },
  {
    label: '已结单',
    value: OrderStatus.Complete,
  },
]
export const Order: React.FC = () => {
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState<OrderStatus | 0>(0)
  const orderList = useSelector((state) => state.orderList)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getOrderList = useCallback(async () => {
    const res = await fetchOrderListApi({ page, status })
    if (res.code === 0) {
      if (page === 0) {
        dispatch({ type: 'SET_ORDER_LIST', payload: res.data.list })
      } else {
        dispatch({ type: 'MORE_ORDER_LIST', payload: res.data.list })
      }
      setTotal(res.data.total)
    }
  }, [page, status])
  useEffect(() => {
    setPage(0)
  }, [status])
  useEffect(() => {
    getOrderList()
  }, [getOrderList])
  const onItemClick = (_id: number) => {
    navigate(`/orderDetail/${_id}`)
  }
  const onStatusChange = (status: OrderStatus | 0) => {
    setStatus(status)
  }
  const onCreateClick = () => {
    navigate('/createOrder')
  }

  const loadMore = async () => {
    setPage(page + 1)
  }
  return (
    <>
      <NavBar
        style={{ backgroundColor: '#fff' }}
        right={
          <div style={{ fontSize: 18 }} onClick={onCreateClick}>
            创建
          </div>
        }
        back={null}
      >
        我的工单
      </NavBar>
      <Selector
        options={options}
        style={{ marginTop: 20, marginLeft: 10 }}
        defaultValue={[0]}
        onChange={(arr) => {
          onStatusChange(arr[0])
        }}
      />
      <List header="我的工单">
        {orderList.length ? (
          orderList.map((order) => (
            <List.Item
              key={order._id}
              description={timestampToDate(
                order.complete_time || order.deal_time || order.create_time
              )}
              clickable
              onClick={() => {
                onItemClick(order._id)
              }}
            >
              {order.title}
            </List.Item>
          ))
        ) : (
          <Empty />
        )}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={orderList.length < total} />
    </>
  )
}
