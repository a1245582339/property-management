import {
  AppstoreOutlined,
  HomeOutlined,
  UserOutlined,
  CarOutlined,
  NotificationOutlined,
  SolutionOutlined,
  AuditOutlined,
  IdcardOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import React from 'react'

export type RouterItem = {
  title: string
  path: string
  icon: JSX.Element
  component: any
}
export const commonRouter = [
  {
    title: '主页',
    path: 'home',
    icon: <AppstoreOutlined />,
    component: React.lazy(() => import('./page/Home/Home')),
  },
  {
    title: '用户管理',
    path: 'user',
    icon: <UserOutlined />,
    component: React.lazy(() => import('./page/User/User')),
  },
  {
    title: '住房管理',
    path: 'room',
    icon: <HomeOutlined />,
    component: React.lazy(() => import('./page/Room/Room')),
  },
  {
    title: '车位管理',
    path: 'parking',
    icon: <CarOutlined />,
    component: React.lazy(() => import('./page/Parking/Parking')),
  },
  {
    title: '工单管理',
    path: 'order',
    icon: <AuditOutlined />,
    component: React.lazy(() => import('./page/Order/Order')),
  },
  {
    title: '公告管理',
    path: 'notice',
    icon: <NotificationOutlined />,
    component: React.lazy(() => import('./page/Notice/Notice')),
  },
  {
    title: '留言板管理',
    path: 'message-board',
    icon: <SolutionOutlined />,
    component: React.lazy(() => import('./page/MessageBoard/MessageBoard')),
  },
  {
    title: '个人信息',
    path: 'me',
    icon: <SmileOutlined />,
    component: React.lazy(() => import('./page/Me/Me')),
  },
]

export const authRouter = [
  {
    title: '管理员管理',
    path: 'admin',
    icon: <IdcardOutlined />,
    component: React.lazy(() => import('./page/Admin/Admin')),
  },
]
