import { useCallback, useEffect, useState } from 'react'
import { fetchRoomUserApi } from '../../api/room'
import User from '../User/User'

type Props = {
  roomId: string
}

export const UserRoomTable: React.FC<Props> = ({ roomId }) => {
  const [userData, setUserData] = useState<User[]>([])
  const getUserRoomData = useCallback(async () => {
    const res = fetchRoomUserApi({ roomId })
    console.log(res)
  }, [roomId])
  useEffect(() => {
    getUserRoomData()
  }, [getUserRoomData])
  return <></>
}
