import { Button, Form, Input, NavBar, Toast } from 'antd-mobile'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUserInfoApi } from '../../api/user'

export const EditName = () => {
  const navigate = useNavigate()
  const { name } = useParams()
  const [loading, setLoading] = useState(false)
  const onFinish = async (val: { name: string }) => {
    setLoading(true)
    Toast.show({
      icon: 'loading',
      content: '请求中…',
    })
    const res = await updateUserInfoApi(val)
    Toast.clear()
    if (res.code === 0) {
      Toast.show({
        icon: 'success',
        content: '保存成功',
      })
      setTimeout(() => {
        navigate(-1)
      }, 1000)
    }
  }
  return (
    <>
      <NavBar
        style={{ backgroundColor: '#fff' }}
        onBack={() => {
          navigate(-1)
        }}
      >
        修改用户名
      </NavBar>
      <Form
        style={{ marginTop: 20 }}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ name }}
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            disabled={loading}
          >
            提交
          </Button>
        }
      >
        <Form.Item
          label="用户名"
          name="name"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input maxLength={50} />
        </Form.Item>
      </Form>
    </>
  )
}
