import { Button, Form, Input, NavBar, TextArea, Toast } from 'antd-mobile'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { createOrderApi } from '../../api/order'

export const CreateOrder = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const onFinish = async (val: { title: string; desc: string }) => {
    setLoading(true)
    Toast.show({
      icon: 'loading',
      content: '请求中…',
    })
    const res = await createOrderApi(val)
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
        创建工单
      </NavBar>
      <Form
        style={{ marginTop: 20 }}
        layout="vertical"
        onFinish={onFinish}
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
          label="标题"
          name="title"
          rules={[{ required: true, message: '标题不能为空' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="desc">
          <TextArea maxLength={100} />
        </Form.Item>
      </Form>
    </>
  )
}
