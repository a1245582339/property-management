import { Pie } from '@ant-design/plots'
import { useEffect, useState } from 'react'
import {
  fetchOccupancyApi,
  fetchOrderStatisticsApi,
  fetchParkingStatisticsApi,
} from '../../api/statistics'
import { OrderStatus } from '../Order/Order'
import './Home.less'
export type Occupancy = {
  user_id?: number
}
export type ParkingStatistics = {
  user_id?: number
}
export type OrderStatistics = {
  status: OrderStatus
}
type Data = { type: string; value: number }
const Home: React.FC = () => {
  const [occupancy, setOccupancy] = useState<Data[]>([
    { type: '未入住', value: 0 },
    { type: '已入住', value: 0 },
  ])
  const [parking, setParking] = useState<Data[]>([
    { type: '已售', value: 0 },
    { type: '未售', value: 0 },
  ])
  const [order, setOrder] = useState<Data[]>([
    { type: '已创建', value: 0 },
    { type: '已处理', value: 0 },
    { type: '已完成', value: 0 },
  ])
  useEffect(() => {
    // 获取入住率
    fetchOccupancyApi().then((res) => {
      let isIn = 0,
        isNotIn = 0
      res.data.forEach((item) => {
        if (item.user_id) {
          isIn++
        } else {
          isNotIn++
        }
      })
      setOccupancy([
        { type: '未入住', value: isNotIn / res.data.length },
        { type: '已入住', value: isIn / res.data.length },
      ])
    })
    // 获取车位统计数据
    fetchParkingStatisticsApi().then((res) => {
      let sold = 0,
        unsold = 0
      res.data.forEach((item) => {
        if (item.user_id) {
          sold++
        } else {
          unsold++
        }
      })
      setParking([
        { type: '已售', value: sold / res.data.length },
        { type: '未售', value: unsold / res.data.length },
      ])
    })
    // 获取订单统计数据
    fetchOrderStatisticsApi().then((res) => {
      let created = 0,
        dealed = 0,
        compelet = 0
      res.data.forEach((item) => {
        if (item.status === OrderStatus.Created) {
          created++
        } else if (item.status === OrderStatus.Dealed) {
          dealed++
        } else {
          compelet++
        }
      })
      setOrder([
        { type: '已创建', value: created / res.data.length },
        { type: '已处理', value: dealed / res.data.length },
        { type: '已完成', value: compelet / res.data.length },
      ])
    })
  }, [])
  const config = {
    // 图表的配置信息
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  }
  return (
    <>
      <div className="occupancy-rate">
        <h1 className="title">入住率</h1>
        <Pie {...config} data={occupancy} />
      </div>
      <div className="occupancy-rate">
        <h1 className="title">车位</h1>
        <Pie {...config} data={parking} />
      </div>
      <div className="occupancy-rate">
        <h1 className="title">订单状态</h1>
        <Pie {...config} data={order} />
      </div>
    </>
  )
}
export default Home
