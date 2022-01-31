import { Button, Form, NavBar, Selector, TextArea, Toast } from 'antd-mobile'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendMessageBoardApi } from '../../api/messageBoard'

export enum MessageType {
  Suggestion = 1,
  Complaint,
  Praise,
}

export const MessageBoard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const onFinish = async (val: { type: MessageType[]; content: string }) => {
    if (!val.type || !val.type.length) {
      Toast.show('请选择类型')
      return
    }
    setLoading(true)
    Toast.show({
      icon: 'loading',
      content: '请求中…',
    })
    const res = await sendMessageBoardApi({
      type: val.type[0],
      content: val.content,
    })
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
        <Form.Item name="type" label="留言类型">
          <Selector
            columns={3}
            options={[
              { label: '建议', value: MessageType.Suggestion },
              { label: '投诉', value: MessageType.Complaint },
              { label: '表扬', value: MessageType.Praise },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '内容不能为空' }]}
        >
          <TextArea maxLength={100} />
        </Form.Item>
      </Form>
    </>
  )
}
