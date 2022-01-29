import { Button, Input, message, Popover, Table } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { ColumnsType } from 'antd/lib/table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createParkingApi,
  deleteParkingApi,
  fetchParkingApi,
} from '../../api/parking'
import User from '../User/User'

export type Parking = {
  _id: number
  cardNumber?: string
  parkingCode: string
  user?: User
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
    const res = await fetchParkingApi({ page, phoneNumber })
    if (res.code === 0) {
      setTableData(res.data.data)
      setTotal(res.data.total)
      setLoading(false)
    }
  }, [page, phoneNumber])
  useEffect(() => {
    getParking()
  }, [getParking])
  const colunms = useMemo<ColumnsType<Parking>>(
    () => [
      {
        title: '车位号',
        dataIndex: 'parkingCode',
        key: 'parkingCode',
      },
      {
        title: '牌照号',
        dataIndex: 'cardNumber',
        key: 'cardNumber',
      },
      {
        title: '所有者',
        dataIndex: 'user.username',
        key: 'username',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render(_, record) {
          return (
            <>
              <Button>更换所有者</Button>
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
                <Button size="small" danger type="primary">
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
  return (
    <>
      <Search
        placeholder="请输入手机号搜索"
        style={{ width: 300, marginBottom: 20 }}
        onSearch={(value) => setPhoneNumber(value)}
      />
      <Button type="primary" onClick={onAddButtonClick}>
        添加车位
      </Button>
      <Table
        pagination={{ total, onChange: setPage }}
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
    </>
  )
}
export default Parking
