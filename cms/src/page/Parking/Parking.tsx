import {
  Avatar,
  Button,
  Input,
  message,
  Popover,
  Table,
  Tag,
  Modal,
  Switch,
} from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createParkingApi,
  deleteParkingApi,
  fetchParkingApi,
  updateParkingApi,
} from '../../api/parking'
import { fetchUserListApi } from '../../api/user'
import User from '../User/User'
import './Parking.less'

export type Parking = {
  _id: number
  card_number?: string
  parking_code: string
  user_id: number
  phoneNumber: string
  name: string
}
const { Search } = Input
const Parking: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [tableData, setTableData] = useState<Parking[]>([])
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [addModalShow, setAddModalShow] = useState(false)
  const [newParkingCode, setNewParkingCode] = useState('')
  const [currentParking, setCurrentParking] = useState<Parking | null>(null)
  const [changeUserModalShow, setChangeUserModalShow] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [carNumber, setCarNumber] = useState('')
  const [onlyShowEmpty, setOnlyShowEmpty] = useState(false)

  const onDeleteButtonClick = async (parking: Parking) => {
    setDeleteLoading(true)
    const res = await deleteParkingApi({ _id: parking._id })
    if (res.code === 0) {
      message.success('删除成功')
    }
    setDeleteLoading(true)
  }
  const getParking = useCallback(async () => {
    setLoading(true)
    const res = await fetchParkingApi({
      page,
      phoneNumber,
      empty: onlyShowEmpty || undefined,
    })
    if (res.code === 0) {
      setTableData(res.data.list)
      setTotal(res.data.total)
      setLoading(false)
    }
  }, [page, phoneNumber, onlyShowEmpty])
  useEffect(() => {
    getParking()
  }, [getParking])
  const onChangeUserClick = (parking: Parking) => {
    setCurrentParking(parking)
    setChangeUserModalShow(true)
  }
  const colunms = useMemo<ColumnsType<Parking>>(
    () => [
      {
        title: '车位号',
        dataIndex: 'parking_code',
        key: 'parking_code',
      },
      {
        title: '牌照号',
        dataIndex: 'car_number',
        key: 'car_number',
        render(carNumber, record) {
          return carNumber || '--'
        },
      },
      {
        title: '所有者',
        dataIndex: 'username',
        key: 'username',
        render(_, record) {
          return record.user_id
            ? `${record.name} (${record.phoneNumber
                .split('')
                .map((num, index) => (index > 2 && index < 7 ? '*' : num))
                .join('')})`
            : '--'
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render(_, record) {
          return (
            <>
              <Button
                size="small"
                onClick={() => {
                  onChangeUserClick(record)
                }}
              >
                更换所有者
              </Button>
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
                title={`确定删除车位？`}
                trigger="click"
              >
                <Button
                  style={{ marginLeft: 4 }}
                  size="small"
                  danger
                  type="primary"
                >
                  删除
                </Button>
              </Popover>
            </>
          )
        },
      },
    ],
    []
  )
  const onCloseAddModal = () => {
    setAddModalShow(false)
    setNewParkingCode('')
  }
  const onAddButtonClick = async () => {
    const res = await createParkingApi({ parkingCode: newParkingCode })
    if (res.code === 0) {
      message.success('创建成功')
      onCloseAddModal()
      getParking()
    }
  }
  const onChangeUserModalCancel = () => {
    setChangeUserModalShow(false)
    setCurrentParking(null)
    setCarNumber('')
  }
  const onChangeUserModalConfirm = async () => {
    if ((!selectedUser && carNumber) || (selectedUser && !carNumber)) {
      message.warn('请确保车牌号与用户同时为空或不为空')
      return
    }
    const res = await updateParkingApi({
      _id: currentParking!._id,
      carNumber: carNumber || null,
      userId: selectedUser ? selectedUser._id : null,
    })
    if (res.code === 0) {
      message.success('更新成功')
      setPage(0)
      getParking()
      onChangeUserModalCancel()
    }
  }
  const onSearch = async (value: string) => {
    const res = await fetchUserListApi({ phoneNumber: value, page: 0 })
    if (res.code === 0) {
      setSelectedUser(res.data)
    }
  }
  return (
    <>
      <Search
        placeholder="请输入手机号搜索"
        style={{ width: 300 }}
        onSearch={(value) => setPhoneNumber(value)}
      />
      <Button
        style={{ marginLeft: 30 }}
        type="primary"
        onClick={() => {
          setAddModalShow(true)
        }}
      >
        添加车位
      </Button>
      <div className="switch">
        只展示空车位
        <Switch
          style={{ marginLeft: 10 }}
          checked={onlyShowEmpty}
          onChange={(value) => {
            setOnlyShowEmpty(value)
          }}
        />
      </div>

      <Table
        pagination={{
          total,
          pageSize: 20,
          current: page + 1,
          onChange: (page) => {
            setPage(page - 1)
          },
        }}
        loading={loading}
        columns={colunms}
        dataSource={tableData}
      />
      <Modal
        visible={addModalShow}
        title="添加车位"
        onCancel={onCloseAddModal}
        onOk={onAddButtonClick}
      >
        <Input
          width={300}
          value={newParkingCode}
          onChange={(e) => {
            setNewParkingCode(e.target.value)
          }}
          placeholder="请输入车位编号"
        />
      </Modal>
      <Modal
        title="添加成员"
        visible={changeUserModalShow}
        onCancel={onChangeUserModalCancel}
        onOk={onChangeUserModalConfirm}
        destroyOnClose
      >
        <Input
          style={{ width: 200, marginBottom: 6 }}
          onChange={(e) => {
            setCarNumber(e.target.value)
          }}
          placeholder="请输入车牌号"
        />
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
                src={selectedUser.avatar}
                style={{ marginRight: 4 }}
              />
              {selectedUser.name}
            </Tag>
          )}
        </div>
      </Modal>
    </>
  )
}
export default Parking
