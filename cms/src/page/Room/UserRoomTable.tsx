import {
  Button,
  Input,
  message,
  Popover,
  Table,
  Modal,
  Tag,
  Avatar,
} from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  addRoomUserApi,
  deleteRoomUserApi,
  fetchRoomUserApi,
} from '../../api/room'
import { fetchUserListApi } from '../../api/user'
import User from '../User/User'

type Props = {
  roomId: number
}
const { Search } = Input
export const UserRoomTable: React.FC<Props> = ({ roomId }) => {
  const [userData, setUserData] = useState<User[]>([])
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const getUserRoomData = useCallback(async () => {
    if (!roomId) {
      return
    }
    setTableLoading(true)
    const res = await fetchRoomUserApi({ roomId })
    if (res.code === 0) {
      setUserData(res.data)
      setTableLoading(false)
    }
  }, [roomId])
  useEffect(() => {
    getUserRoomData()
  }, [getUserRoomData])
  const onDeleteButtonClick = useCallback(
    async (user: User) => {
      setDeleteLoading(true)
      const res = await deleteRoomUserApi({
        userId: user._id,
        roomId,
      })
      if (res.code === 0) {
        message.success('删除成功')
        setDeleteLoading(false)
        getUserRoomData()
      }
    },
    [roomId]
  )
  const onSearch = async (value: string) => {
    const res = await fetchUserListApi({ phoneNumber: value, page: 0 })
    if (res.code === 0) {
      setSelectedUser(res.data)
    }
  }
  const onConfirmAddUser = async () => {
    const close = message.loading('添加中...')
    const res = await addRoomUserApi({
      userId: selectedUser!._id,
      roomId,
    })
    if (res.code === 0) {
      close()
      message.success('添加成功')
      onModalCancel()
      getUserRoomData()
    }
  }
  const onModalCancel = () => {
    setShowModal(false)
    setSelectedUser(null)
  }
  const columns = useMemo(
    () => [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '手机号',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (_: any, record: User) => (
          <Popover
            content={
              <div>
                <Button
                  size="small"
                  danger
                  type="primary"
                  loading={deleteLoading}
                  onClick={() => {
                    onDeleteButtonClick(record)
                  }}
                >
                  确定
                </Button>
              </div>
            }
            title={`确定删除将用户 ${record.name} 从该房间中删除？`}
            trigger="click"
          >
            <Button size="small" danger type="primary">
              删除
            </Button>
          </Popover>
        ),
      },
    ],
    [roomId, userData]
  )

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setShowModal(true)
        }}
        disabled={!roomId}
      >
        添加成员
      </Button>
      <Table
        style={{ height: '100%', marginTop: 10 }}
        pagination={false}
        dataSource={userData}
        columns={columns}
        loading={tableLoading}
      />

      <Modal
        title="添加成员"
        visible={showModal}
        onCancel={onModalCancel}
        onOk={onConfirmAddUser}
        okButtonProps={{
          disabled: !selectedUser,
        }}
        destroyOnClose
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Search
            placeholder="输入手机号搜索用户"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
          {selectedUser && (
            <Tag
              style={{
                marginLeft: 20,
                display: 'flex',
                alignItems: 'center',
              }}
              color="blue"
            >
              <Avatar
                size={14}
                src={`http://localhost:7001${selectedUser.avatar}`}
                style={{ marginRight: 4 }}
              />
              {selectedUser.name}
            </Tag>
          )}
        </div>
      </Modal>
    </div>
  )
}
