import { Layout } from 'antd'
import { MyHeader as Header } from '../component/Header/Header'
import { MySider as Sider } from '../component/SideBar/SideBar'
import React, { Suspense, useEffect, useMemo } from 'react'
import { fetchAdminUserInfoApi } from '../api/admin'
import { useDispatch } from '../store'
import { RouterItem } from '../router'
import { Outlet } from 'react-router-dom'
const { Content } = Layout

export enum Role {
  NoLogin,
  SuperAdmin,
  Admin,
}

export type AdminUserInfo = {
  _id?: number
  email: string
  name: string
  role: Role
}

type Props = {
  router: RouterItem[]
}
export const Dashboard: React.FC<Props> = ({ router }) => {
  const disaptch = useDispatch()
  useEffect(() => {
    fetchAdminUserInfoApi().then((res) => {
      if (res.code === 0) {
        disaptch({ type: 'SET_ADMIN', payload: res.data })
      }
    })
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Sider router={router} />
        <Layout>
          <Header />
          <Content style={{ margin: '0 16px' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
