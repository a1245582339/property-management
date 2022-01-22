import { Button, Card, Form, Input } from 'antd'
import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './Login.less'
import { loginApi } from '../../api/admin'
import md5 from 'md5'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { authRouter } from '../../router'

export type LoginForm = {
  email: string
  password: string
}

export type AuthResponse = {
  user_id: string
  authorization_token: string
}

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const onFinish = async (value: LoginForm) => {
    const authResult = await loginApi({
      email: value.email,
      password: md5(value.password),
    })
    if (authResult.code === 0) {
      Cookies.set('user_id', authResult.data.user_id)
      navigate('/dashboard')
    }
  }
  return (
    <div className="login">
      <Card className="card" hoverable>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱！' },
              { message: '不是正确的邮箱格式', type: 'email' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入邮箱"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
