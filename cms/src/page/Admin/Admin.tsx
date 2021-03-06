import { Space, Table, Input, Button, Popover, message } from 'antd'
import md5 from 'md5'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  deleteAdminUserApi,
  editAdminUserApi,
  fetchAdminListApi,
} from '../../api/admin'
import { useSelector } from '../../store'
import { AdminUserInfo, Role } from '../Dashboard'
import { EditModal } from './EditModal'

const { Search } = Input
const Admin: React.FC = () => {
  const [tableData, setTableData] = useState<AdminUserInfo[]>([])
  const [page, setPage] = useState(0)
  const [name, setName] = useState('')
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [editModalShow, setEditModalShow] = useState(false)
  const [currentAdminUser, setCurrentAdminUser] =
    useState<AdminUserInfo | null>(null)
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const adminUserId = useSelector((state) => state.adminUserInfo._id)
  const onCreateAdminUserUserClick = () => {
    setCurrentAdminUser({
      name: '',
      email: '',
      role: Role.Admin,
    })
    setEditModalShow(true)
  }
  const onEditButtonClick = (adminUser: AdminUserInfo) => {
    setCurrentAdminUser(adminUser)
    setEditModalShow(true)
  }
  const onEditModalClose = (refresh = false) => {
    setCurrentAdminUser(null)
    setEditModalShow(false)
    if (refresh) {
      getAdminList()
    }
  }
  const onResetPasswordButtonClick = (adminUser: AdminUserInfo) => {
    setResetPasswordLoading(true)
    editAdminUserApi({ ...adminUser, password: md5('000000') }).then((res) => {
      if (res.code === 0) {
        message.success('重置成功')
        setResetPasswordLoading(false)
      }
    })
  }
  const onDeleteButtonClick = (adminUser: AdminUserInfo) => {
    setDeleteLoading(true)
    deleteAdminUserApi({ _id: adminUser._id! })
      .then((res) => {
        if (res.code === 0) {
          message.success('删除成功')
        } else {
          message.error(`删除失败`)
        }
      })
      .finally(() => {
        getAdminList()
      })
  }
  const columns = useMemo(
    () => [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
        render(role: Role) {
          return role === Role.SuperAdmin ? '超级管理员' : '管理员'
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (_: any, record: AdminUserInfo) => (
          <Space size="middle">
            <Button
              size="small"
              onClick={() => {
                onEditButtonClick(record)
              }}
            >
              编辑
            </Button>
            <Popover
              content={
                <div>
                  <Button
                    size="small"
                    danger
                    type="primary"
                    loading={resetPasswordLoading}
                    disabled={record._id === adminUserId}
                    onClick={() => {
                      onResetPasswordButtonClick(record)
                    }}
                  >
                    确定
                  </Button>
                </div>
              }
              title="确定要将密码重置为 000000 ？"
              trigger="click"
            >
              <Button
                size="small"
                danger
                type="primary"
                disabled={record._id === adminUserId}
              >
                重置密码
              </Button>
            </Popover>
            <Popover
              content={
                <div>
                  <Button
                    size="small"
                    danger
                    type="primary"
                    loading={deleteLoading}
                    disabled={record._id === adminUserId}
                    onClick={() => {
                      onDeleteButtonClick(record)
                    }}
                  >
                    确定
                  </Button>
                </div>
              }
              title={`确定删除管理员 ${record.name} ？`}
              trigger="click"
            >
              <Button
                size="small"
                danger
                type="primary"
                disabled={record._id === adminUserId}
              >
                删除
              </Button>
            </Popover>
          </Space>
        ),
      },
    ],
    [resetPasswordLoading, deleteLoading, tableData]
  )
  const getAdminList = useCallback(async () => {
    setLoading(true)
    const res = await fetchAdminListApi({ name, page, count: 20 })
    if (res.code === 0) {
      setTableData(res.data.list)
      setTotal(res.data.total)
      setLoading(false)
    }
  }, [page, name])
  useEffect(() => {
    getAdminList()
  }, [getAdminList])
  return (
    <>
      <Search
        placeholder="输入姓名搜索"
        onSearch={(value) => {
          setName(value)
        }}
        style={{ width: 400, marginBottom: 20 }}
      />
      <Button
        type="primary"
        style={{ marginLeft: 20 }}
        onClick={onCreateAdminUserUserClick}
      >
        新建管理员
      </Button>
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
      <EditModal
        show={editModalShow}
        adminInfo={currentAdminUser}
        onClose={onEditModalClose}
      />
    </>
  )
}
export default Admin
