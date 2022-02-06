import { Button, Card, Form, Input, message } from 'antd'
import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './Login.less'
import { loginApi } from '../../api/admin'
import md5 from 'md5'
import { useNavigate } from 'react-router-dom'

export type LoginForm = {
  email: string
  password: string
}

export type AuthResponse = {
  user_id: number
  authorization_token: string
}

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const onFinish = async (value: LoginForm) => {
    // 点击登录后
    const authResult = await loginApi({
      // 调用登录接口
      email: value.email,
      password: md5(value.password), // 对密码进行md5加密
    })
    if (authResult.code === 0) {
      navigate('/dashboard') // 登录成功后跳转到首页
    } else {
      message.error('邮箱或密码错误，请重试')
    }
  }
  return (
    <div className="login">
      <Card className="card" hoverable title="登录">
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
