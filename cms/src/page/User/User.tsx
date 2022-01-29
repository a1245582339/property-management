import { Button, Input, Table } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchUserListApi } from '../../api/user'
import './User.less'
import { UserRoomModal } from './UserRoomModal'
type User = {
  _id: number
  name: string
  avatar: string
  phoneNumber: string
}

const { Search } = Input

const User: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [tableData, setTableData] = useState<User[]>([])

  const [userRoomModalShow, setUserRoomModalShow] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(0)
  const getUserList = useCallback(() => {
    setLoading(true)
    fetchUserListApi({ phoneNumber, getList: true, page }).then((res) => {
      if (res.code === 0) {
        setTableData(res.data.list)
        setTotal(phoneNumber ? res.data.total : 1)
        setLoading(false)
      }
    })
  }, [page, phoneNumber])
  useEffect(() => {
    getUserList()
  }, [getUserList])

  const onModalCancel = () => {
    setUserRoomModalShow(false)
  }
  const columns = useMemo(
    () => [
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        width: 100,
        render(src: string) {
          return <img className="avatar" src={src} alt="" />
        },
      },
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
        title: '房间',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        render(_: any, record: User) {
          return (
            <Button
              type="link"
              onClick={() => {
                setUserRoomModalShow(true)
                setCurrentUserId(record._id)
              }}
            >
              查看此人房间
            </Button>
          )
        },
      },
    ],
    [tableData]
  )
  return (
    <>
      <Search
        placeholder="输入手机号搜索"
        onSearch={(value) => {
          setPhoneNumber(value)
        }}
        style={{ width: 400, marginBottom: 20 }}
      />
      <Table
        pagination={{
          total,
          pageSize: 20,
          current: page + 1,
          onChange: (page) => {
            setPage(page - 1)
          },
        }}
        rowKey={(record) => record._id!}
        loading={loading}
        columns={columns}
        dataSource={tableData}
      ></Table>
      <UserRoomModal
        show={userRoomModalShow}
        onCancel={onModalCancel}
        userId={currentUserId}
      />
    </>
  )
}
export default User
