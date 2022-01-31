import { Button, Card, Input, Toast } from 'antd-mobile'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { loginApi } from '../api/user'
const phoneNumberReg =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
export const Login: React.FC = () => {
  const [count, setCount] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [validCode, setValidCode] = useState('')
  const navigate = useNavigate()

  const onSendMsg = () => {
    if (phoneNumberReg.test(phoneNumber)) {
      setCount(60)
    } else {
      Toast.show('请输入正确手机号')
    }
  }
  useEffect(() => {
    if (count !== 0) {
      setTimeout(() => {
        setCount(count - 1)
      }, 1000)
    }
  }, [count])
  const login = async () => {
    if (validCode !== '0000') {
      Toast.show('验证码错误')
    } else {
      const res = await loginApi({ phoneNumber })
      if (res.code === 0) {
        navigate('/main', { replace: true })
      } else {
        Toast.show('登录失败')
      }
    }
  }
  return (
    <>
      <Card
        style={{
          width: 300,
          position: 'absolute',
          left: '50%',
          top: '20%',
          height: 300,
          transform: 'translateX(-50%)',
          boxSizing: 'border-box',
          padding: '30px 10px',
        }}
      >
        <div
          style={{
            lineHeight: '30px',
            textAlign: 'center',
            fontSize: 24,
            color: '#333',
            marginBottom: 10,
          }}
        >
          登录
        </div>
        <Input
          style={{ width: '100%', marginBottom: 20 }}
          onChange={(val) => {
            setPhoneNumber(val)
          }}
          placeholder="手机号"
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Input
            style={{ width: '55%', marginRight: 10 }}
            placeholder="验证码"
            onChange={(val) => {
              setValidCode(val)
            }}
          />
          <Button
            color="primary"
            disabled={!!count}
            style={{ flex: 1 }}
            onClick={() => {
              onSendMsg()
            }}
          >
            {count ? `${count}` : '发送验证码'}
          </Button>
        </div>
        <Button
          color="primary"
          style={{ width: '100%', marginTop: 20 }}
          onClick={login}
          disabled={!phoneNumberReg.test(phoneNumber) || !validCode}
        >
          登录
        </Button>
        <div style={{ marginTop: 16, color: '#aaa' }}>
          * 首次登录的用户将自动注册
        </div>
      </Card>
    </>
  )
}
