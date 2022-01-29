import { Button, Input, Table } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchUserListApi } from '../../api/user'
import './User.less'
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
    ],
    []
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
          onChange: (page) => {
            setPage(page)
          },
          pageSize: 20,
          total: total,
        }}
        rowKey={(record) => record._id!}
        loading={loading}
        columns={columns}
        dataSource={tableData}
      ></Table>
    </>
  )
}
export default User
