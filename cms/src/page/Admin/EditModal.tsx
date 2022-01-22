import { Button, Form, Input, message, Modal, Select } from 'antd'
import md5 from 'md5'
import { useEffect, useState } from 'react'
import { createAdminUser, editAdminUser } from '../../api/admin'
import { useSelector } from '../../store'
import { AdminUserInfo, Role } from '../Dashboard'

type Props = {
  show: boolean
  adminInfo: AdminUserInfo | null
  onClose: (refresh?: boolean) => void
}
const { Option } = Select
export const EditModal: React.FC<Props> = ({ adminInfo, show, onClose }) => {
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  useEffect(() => {
    if (show) {
      form.setFieldsValue(adminInfo)
    }
  }, [show])
  const onOk = () => {
    setConfirmLoading(true)
    const formData = form.getFieldsValue()
    if (adminInfo!._id) {
      // 编辑
      editAdminUser({ _id: adminInfo!._id, ...formData })
        .then((res) => {
          if (res.code === 0) {
            message.success('修改成功')
          } else {
            message.error(`修改失败 ${res.msg}`)
          }
        })
        .finally(() => {
          setConfirmLoading(false)
          onClose(true)
        })
    } else {
      // 新建
      createAdminUser({ ...formData, password: md5('000000') })
        .then((res) => {
          if (res.code === 0) {
            message.success('创建成功')
          } else {
            message.error(`创建失败 ${res.msg}`)
          }
        })
        .finally(() => {
          setConfirmLoading(false)
          onClose(true)
        })
    }
  }
  const onCancel = () => {
    onClose()
  }
  return (
    <Modal
      destroyOnClose
      visible={show}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
    >
      <div style={{ paddingTop: 40 }}>
        {adminInfo && (
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item
              label="用户名"
              name="name"
              rules={[{ required: true, message: '请输入用户名！' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱！' },
                { message: '不是正确的邮箱格式', type: 'email' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="设为管理员" name="role">
              <Select
                style={{ width: 120 }}
                disabled={adminInfo.role === Role.SuperAdmin}
              >
                <Option value={Role.SuperAdmin}>超级管理员</Option>
                <Option value={Role.Admin}>管理员</Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </div>
    </Modal>
  )
}
