import { NavBar, Slider, Steps } from 'antd-mobile'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from '../../store'
import { timestampToDate } from '../../utils/time'
import { OrderStatus } from './Order'
const marks = {
  10: '已创建',
  50: '已处理',
  90: '已结单',
}
const { Step } = Steps
export const OrderDetail = () => {
  const orderList = useSelector((state) => state.orderList)
  const { orderId } = useParams()
  const navigate = useNavigate()
  const order = useMemo(() => {
    return orderList.find((order) => order._id === Number(orderId))
  }, [orderId])
  return (
    <>
      <NavBar
        style={{ backgroundColor: '#fff' }}
        onBack={() => {
          navigate(-1)
        }}
      >
        工单详情
      </NavBar>
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 20, fontWeight: 'bold' }}>{order?.title}</div>
        <div style={{ marginTop: 20 }}>
          流转时间：
          {timestampToDate(
            order!.complete_time || order!.deal_time || order!.create_time
          )}
        </div>
        <div style={{ fontSize: 16, marginTop: 20 }}> {order?.desc}</div>
        {order && (
          <Steps direction="vertical" style={{ marginTop: 20 }}>
            <Step
              title="已创建"
              status={order.status >= OrderStatus.Created ? 'finish' : 'wait'}
              description={
                order.create_time ? timestampToDate(order.create_time) : '--'
              }
            />
            <Step
              title="已处理"
              status={order.status >= OrderStatus.Dealed ? 'finish' : 'wait'}
              description={
                order.deal_time ? timestampToDate(order.deal_time) : '--'
              }
            />
            <Step
              title="已结单"
              status={order.status >= OrderStatus.Complete ? 'finish' : 'wait'}
              description={
                order.complete_time
                  ? timestampToDate(order.complete_time)
                  : '--'
              }
            />
          </Steps>
        )}
      </div>
    </>
  )
}
