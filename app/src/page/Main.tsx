import { TabBar } from 'antd-mobile'
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const Main: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const onTabChange = (key: string) => {
    navigate(key, { replace: true })
  }
  return (
    <>
      <div style={{ maxHeight: 'calc(100vh - 50px)', overflowY: 'auto' }}>
        <Outlet />
      </div>

      <TabBar
        style={{
          bottom: 0,
          position: 'fixed',
          width: '100%',
          backgroundColor: '#fff',
        }}
        onChange={(key) => {
          onTabChange(key)
        }}
        defaultActiveKey={location.pathname.replace('/main/', '')}
      >
        <TabBar.Item key="order" icon={<UnorderedListOutline />} title="工单" />
        <TabBar.Item key="room" icon={<AppOutline />} title="住房" />
        <TabBar.Item key="me" icon={<UserOutline />} title="我的" />
      </TabBar>
    </>
  )
}
