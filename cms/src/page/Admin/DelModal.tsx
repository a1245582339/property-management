import { message, Modal } from 'antd'
import { useState } from 'react'
import { deleteAdminUser } from '../../api/admin'
import { AdminUserInfo } from '../Dashboard'

type Props = {
  show: boolean
  adminInfo: AdminUserInfo | null
  onClose: (refresh?: boolean) => void
}

export const DelModal: React.FC<Props> = ({ show, adminInfo, onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const onOk = () => {
    setConfirmLoading(true)
    deleteAdminUser({ _id: adminInfo!._id })
      .then((res) => {
        if (res.code === 0) {
          message.success('删除成功')
        } else {
          message.error(`删除失败 ${res.msg}`)
        }
      })
      .finally(() => {
        setConfirmLoading(false)
        onClose(true)
      })
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
      <p>确定要删除管理员 {adminInfo?.name} ？</p>
    </Modal>
  )
}
