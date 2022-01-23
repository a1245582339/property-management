import { Button, Card, Descriptions, Form, Input, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import md5 from 'md5'
import { useState } from 'react'
import { changePassword } from '../../api/admin'
import { useSelector } from '../../store'
import { Role } from '../Dashboard'

const Me: React.FC = () => {
  const adminUserInfo = useSelector((state) => state.adminUserInfo)
  const [form] = useForm<{
    newPassword: string
    oldPassword: string
    repeatPassword: string
  }>()
  const onFinish = () => {
    const formData = form.getFieldsValue()
    changePassword({
      oldPassword: md5(formData.oldPassword),
      newPassword: md5(formData.newPassword),
    }).then((res) => {
      if (res.code === 0) {
        message.success('修改成功')
        form.resetFields()
      } else {
        message.error(`修改失败 ${res.msg}`)
      }
    })
  }
  return (
    <>
      <Card style={{ width: 800, margin: 20 }} hoverable>
        <Descriptions
          style={{
            backgroundColor: '#fff',
          }}
          column={1}
          title={adminUserInfo.name}
        >
          <Descriptions.Item label="Email">
            {adminUserInfo.email}
          </Descriptions.Item>
          <Descriptions.Item label="权限">
            {adminUserInfo.role === Role.SuperAdmin ? '超级管理员' : '管理员'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="修改密码" style={{ width: 800, margin: 20 }} hoverable>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="旧密码"
            name="oldPassword"
            rules={[{ required: true, message: '请输入旧密码' }]}
          >
            <Input type="password" placeholder="请输入旧密码" />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              { required: true, message: '请输入新密码' },
              () => ({
                validator(_, value) {
                  if (
                    /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)
                  ) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('密码必须长度6-18位，必须包含数字及英文')
                  )
                },
              }),
            ]}
          >
            <Input type="password" placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item
            label="重复新密码"
            name="repeatPassword"
            rules={[
              { required: true, message: '请重复新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不一致！'))
                },
              }),
            ]}
          >
            <Input type="password" placeholder="请重复新密码" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
export default Me
