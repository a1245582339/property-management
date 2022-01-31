import { Empty, List, NavBar } from 'antd-mobile'
import { useCallback, useEffect, useState } from 'react'
import { fetchRoomListApi } from '../../api/room'

export type Room = {
  _id: number
  room_id: number
  user_id: number
  room_num: string
  unit_num: string
  building_num: string
}

export const Room: React.FC = () => {
  const [roomList, setRoomList] = useState<Room[]>([])
  const getMyRoom = useCallback(async () => {
    const res = await fetchRoomListApi()
    if (res.code === 0) {
      setRoomList(res.data)
    }
  }, [])
  useEffect(() => {
    getMyRoom()
  }, [getMyRoom])
  return (
    <>
      <NavBar style={{ backgroundColor: '#fff' }} back={null}>
        我的房间
      </NavBar>
      <List header="我的房间">
        {roomList.length ? (
          roomList.map((room) => (
            <List.Item
              key={room._id}
            >{`${room.building_num}号楼${room.unit_num}单元${room.room_num}号房间`}</List.Item>
          ))
        ) : (
          <Empty />
        )}
      </List>
    </>
  )
}
