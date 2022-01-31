import { Button, Layout } from 'antd'
import { useNavigate } from 'react-router-dom'
import { logoutApi } from '../../api/admin'
import { useSelector } from '../../store'

const { Header } = Layout
export const MyHeader: React.FC = () => {
  const navigate = useNavigate()
  const adminUserInfo = useSelector((state) => state.adminUserInfo)
  const onLogoutClick = async () => {
    await logoutApi()
    navigate('/login')
  }
  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, backgroundColor: '#fff' }}
    >
      <div style={{ float: 'right', color: '#262626' }}>
        欢迎回来 {adminUserInfo.name}{' '}
        <Button
          type="link"
          onClick={() => {
            onLogoutClick()
          }}
        >
          退出登录
        </Button>
      </div>
    </Header>
  )
}
