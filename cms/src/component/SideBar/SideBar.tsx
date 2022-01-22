import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Role } from '../../page/Dashboard'
import { authRouter, commonRouter, RouterItem } from '../../router'
import { useSelector } from '../../store'

const { Sider } = Layout
const { SubMenu } = Menu

type Props = {
  router: RouterItem[]
}

export const MySider: React.FC<Props> = ({ router }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [currentSelectedKey, setCurrentSelectedKey] = useState(router[0].path)
  const navigate = useNavigate()
  let location = useLocation()
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  const onItemClick = (routerItem: RouterItem) => {
    navigate(routerItem.path)
  }
  useEffect(() => {
    const path = location.pathname.replace('/dashboard/', '')
    setCurrentSelectedKey(path)
  }, [location])
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" selectedKeys={[currentSelectedKey]} mode="inline">
        {router.map((item) => (
          <Menu.Item
            key={item.path}
            icon={item.icon}
            onClick={() => {
              onItemClick(item)
            }}
          >
            {item.title}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}
