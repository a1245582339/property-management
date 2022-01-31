import { NavBar, Slider } from 'antd-mobile'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useSelector } from '../../store'
import { timestampToDate } from '../../utils/time'
const marks = {
  10: '已创建',
  50: '已处理',
  90: '已结单',
}
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
        <Slider
          style={{ opacity: 1, marginTop: 20 }}
          marks={marks}
          ticks
          disabled
          value={10}
        />
        <div style={{ fontSize: 16, marginTop: 20 }}> {order?.desc}</div>
      </div>
    </>
  )
}
