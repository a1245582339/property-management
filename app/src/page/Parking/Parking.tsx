import { Empty, List, NavBar } from 'antd-mobile'
import { useCallback, useEffect, useState } from 'react'
import { fetchParkingListApi } from '../../api/parking'
import { fetchUserInfoApi } from '../../api/user'

export type Parking = {
  _id: number
  car_number: string
  parking_code: string
}

export const Parking: React.FC = () => {
  const [parkingList, setParkingList] = useState<Parking[]>([])
  const getUserInfo = useCallback(async () => {
    const res = await fetchParkingListApi()
    if (res.code === 0) {
      setParkingList(res.data)
    }
  }, [])
  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])
  return (
    <>
      <NavBar style={{ backgroundColor: '#fff' }} back={null}>
        我的车位
      </NavBar>
      <List header="我的车位">
        {parkingList.length ? (
          parkingList.map((parking) => (
            <List.Item key={parking._id} description={parking.car_number}>
              {parking.parking_code}
            </List.Item>
          ))
        ) : (
          <Empty />
        )}
      </List>
    </>
  )
}
