import { NavBar } from 'antd-mobile'
import { useCallback, useEffect, useState } from 'react'
import { fetchUserInfoApi } from '../../api/user'

export type UserInfo = {
  _id: number
  name: string
  avatar: string
  phoneNumber: string
}

export const Me: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const getUserInfo = useCallback(async () => {
    const res = await fetchUserInfoApi()
    if (res.code === 0) {
      setUserInfo(res.data)
    }
  }, [])
  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])
  const onEditClick = () => {}
  return (
    <>
      <NavBar
        style={{ backgroundColor: '#fff' }}
        right={
          <div style={{ fontSize: 18 }} onClick={onEditClick}>
            创建
          </div>
        }
      >
        我的工单
      </NavBar>
    </>
  )
}
