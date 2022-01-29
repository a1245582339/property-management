import { Empty, Modal } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { fetchRoomUserApi } from '../../api/room'
import './UserRoomModal.less'
type Props = {
  show: boolean
  onCancel: () => void
  userId: number
}

export type UserRoom = {
  _id: number
  user_id: number
  room_id: number
  room_num: string
  unit_num: string
  building_num: string
}

export const UserRoomModal: React.FC<Props> = ({ show, onCancel, userId }) => {
  const [userRoom, setUserRoom] = useState<UserRoom[]>([])
  const getUserRoom = useCallback(async () => {
    if (show) {
      const res = await fetchRoomUserApi({ userId })
      if (res.code === 0) {
        setUserRoom(res.data)
      }
    }
  }, [show, userId])
  useEffect(() => {
    getUserRoom()
  }, [getUserRoom])
  useEffect(() => {
    setUserRoom([])
  }, [show])
  return (
    <Modal title="房间" visible={show} footer={null} onCancel={onCancel}>
      <div className="room-list">
        {userRoom.length ? (
          userRoom.map((item) => (
            <div className="room-item" key={item._id}>
              <span className="num">{item.building_num}</span> 号楼{' '}
              <span className="num">{item.unit_num}</span> 单元{' '}
              <span className="num">{item.room_num}</span> 房间
            </div>
          ))
        ) : (
          <Empty description="此人没有所属的房间" />
        )}
      </div>
    </Modal>
  )
}
