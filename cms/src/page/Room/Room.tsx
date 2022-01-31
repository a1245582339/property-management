import { HomeOutlined } from '@ant-design/icons'
import { Card, Input, Layout, Menu, message, Modal, Spin, Tree } from 'antd'
import { EventDataNode } from 'antd/lib/tree'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  addBuildingApi,
  addUnitApi,
  addRoomApi,
  fetchBuildingApi,
  fetchRoomApi,
  fetchUnitApi,
  delBuildingApi,
  delRoomApi,
  delUnitApi,
} from '../../api/room'
import { UserRoomTable } from './UserRoomTable'
const { Sider, Content } = Layout
export type Room = { _id: number; num: number }
export type Unit = { _id: number; num: number }
export type Building = {
  _id: number
  num: number
  floor: number
}
type DataNode = {
  title: string
  key: string
  isLeaf?: boolean
  type: 'root' | 'room' | 'unit' | 'building'
  data?: Room | Unit | Building
  icon?: JSX.Element
  children?: DataNode[]
}
const community: DataNode = {
  title: 'XX社区',
  key: '0',
  type: 'root',
  children: [],
}
const Room: React.FC = () => {
  const [treeData, setTreeData] = useState<DataNode[]>([community])
  const [currentRoomId, setCurrentRoomId] = useState(0)
  const [rightMenuPosition, setRightMenuPosition] = useState([0, 0])
  const [rightMenuShow, setRightMenuShow] = useState(false)
  const [currentRightClickNode, setCurrentRightClickNode] = useState<
    (EventDataNode & DataNode) | null
  >(null)
  const [createNodeModalShow, setCreateNodeModalShow] = useState(false)
  const [newNumValue, setNewNumValue] = useState('')
  const [treeLoading, setTreeLoading] = useState(true)
  const [delConfirmModalShow, setDelConfirmModalShow] = useState(false)

  const treeBarRef = useRef<HTMLDivElement>(null)
  const getBuildings = useCallback(() => {
    setTreeLoading(true)
    fetchBuildingApi().then((res) => {
      if (res.code === 0) {
        setTreeData([
          {
            ...community,
            children: res.data.map((building) => {
              return {
                title: `${building.num}号楼`,
                data: building,
                key: 'building' + building._id.toString(),
                type: 'building',
              }
            }),
          },
        ])
        setTreeLoading(false)
      }
    })
  }, [])
  useEffect(() => {
    getBuildings()
  }, [getBuildings])
  const onLoadData = async (treeNode: EventDataNode) => {
    const currNode = treeNode as EventDataNode & DataNode
    const hideLoading = currNode.type !== 'root' && message.loading('加载中...')
    if (currNode.type === 'building') {
      const res = await fetchUnitApi({ buildingId: currNode.data!._id })
      if (res.code === 0) {
        setTreeData((origin) => {
          const newTree = [...origin]
          const [_, __, buildingIndex] = currNode.pos
            .split('-')
            .map((item) => Number(item))
          newTree[0].children![buildingIndex].children = res.data.map(
            (unit) => {
              return {
                title: `${unit.num}单元`,
                data: unit,
                key: 'unit' + unit._id.toString(),
                type: 'unit',
                children: [],
              }
            }
          )
          res.data.length === 0 && message.info('当前楼没有单元')
          return newTree
        })
      }
    } else if (currNode.type === 'unit') {
      const res = await fetchRoomApi({ unitId: currNode.data!._id })
      if (res.code === 0) {
        setTreeData((origin) => {
          const newTree = [...origin]
          const [_, __, buildingIndex, unitIndex] = currNode.pos
            .split('-')
            .map((item) => Number(item))
          newTree[0].children![buildingIndex].children![unitIndex].children =
            res.data.map((room) => {
              return {
                title: `${room.num}号`,
                data: room,
                key: 'room' + room._id.toString(),
                type: 'room',
                children: [],
                isLeaf: true,
                icon: <HomeOutlined />,
              }
            })
          res.data.length === 0 && message.info('当前单元没有房间')
          return newTree
        })
      }
    }
    hideLoading && hideLoading()
  }
  const onNodeSelect = (
    _: any,
    info: {
      event: 'select'
      selected: boolean
      node: EventDataNode
      selectedNodes: DataNode[]
      nativeEvent: MouseEvent
    }
  ) => {
    const node = info.node as EventDataNode & DataNode
    if (node.type === 'room') {
      setCurrentRoomId(node.data!._id)
    }
  }
  const onSiderBarClick = () => {
    setRightMenuShow(false)
  }
  const onRightClick = (info: {
    event: React.MouseEvent<Element, MouseEvent>
    node: EventDataNode
  }) => {
    info.event.stopPropagation()
    const node = info.node as EventDataNode & DataNode
    if (node.type !== 'root') {
      const treeBarPosition = treeBarRef.current?.getBoundingClientRect()
      const { pageX, pageY } = info.event
      setRightMenuPosition([
        pageX - treeBarPosition!.x,
        pageY - treeBarPosition!.y,
      ])
      setRightMenuShow(true)
      setCurrentRightClickNode(node)
    }
  }
  const nodeToStr = useMemo(() => {
    if (!currentRightClickNode) return ''
    if (currentRightClickNode.type === 'root') {
      return '楼'
    } else if (currentRightClickNode.type === 'building') {
      return '单元'
    } else if (currentRightClickNode.type === 'unit') {
      return '房间'
    } else {
      return ''
    }
  }, [currentRightClickNode])
  const onClickCreateChild = () => {
    setCreateNodeModalShow(true)
  }
  const onCancelCreateNode = () => {
    setCreateNodeModalShow(false)
    setCurrentRightClickNode(null)
    setNewNumValue('')
  }
  const onConfirmCreateNode = async () => {
    if (!newNumValue) {
      message.warn('请输入编号！')
      return
    }
    const pNode = currentRightClickNode!
    const { type, data } = pNode
    if (type === 'root') {
      await addBuildingApi({ num: newNumValue })
    } else if (type === 'building') {
      await addUnitApi({ num: newNumValue, buildingId: data!._id })
    } else if (type === 'unit') {
      await addRoomApi({ num: newNumValue, unitId: data!._id })
    }
    setTreeData([community])
    onCancelCreateNode()
    getBuildings()
  }
  const onDeleteTreeNode = async () => {
    const pNode = currentRightClickNode!
    const { type, data } = pNode
    if (type === 'building') {
      await delBuildingApi({ _id: data!._id })
    } else if (type === 'unit') {
      await delUnitApi({ _id: data!._id })
    } else if (type === 'room') {
      await delRoomApi({ _id: data!._id })
    }
    setTreeData([community])
    setDelConfirmModalShow(false)
    getBuildings()
  }
  return (
    <>
      <Layout style={{ padding: 30, height: 800 }}>
        <Sider
          theme="light"
          style={{
            height: '100%',
            overflowY: 'auto',
            position: 'relative',
            overflowX: 'hidden',
            padding: 20,
          }}
          onClick={onSiderBarClick}
          ref={treeBarRef}
          width={220}
        >
          {rightMenuShow && (
            <Card
              hoverable
              style={{
                width: 300,
                position: 'absolute',
                left: rightMenuPosition[0],
                top: rightMenuPosition[1],
                zIndex: 1,
              }}
              bodyStyle={{ padding: 0 }}
            >
              <Menu>
                {currentRightClickNode?.type !== 'room' && (
                  <Menu.Item key="1" onClick={onClickCreateChild}>
                    创建子条目
                  </Menu.Item>
                )}
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setDelConfirmModalShow(true)
                  }}
                >
                  删除
                </Menu.Item>
              </Menu>
            </Card>
          )}
          {!treeLoading ? (
            <Tree
              onClick={(e) => {
                e.stopPropagation()
              }}
              showIcon
              onRightClick={onRightClick}
              loadData={onLoadData}
              treeData={treeData}
              onSelect={onNodeSelect}
            />
          ) : (
            <Spin spinning={treeLoading} />
          )}
          <Modal
            visible={createNodeModalShow}
            title={`创建${nodeToStr}`}
            onCancel={onCancelCreateNode}
            onOk={onConfirmCreateNode}
          >
            <Input
              onChange={(e) => {
                setNewNumValue(e.target.value)
              }}
              placeholder={`请输入${nodeToStr}编号`}
            />
          </Modal>
          <Modal
            title="确认删除？"
            visible={delConfirmModalShow}
            onCancel={() => {
              setDelConfirmModalShow(false)
            }}
            onOk={() => {
              onDeleteTreeNode()
            }}
          >
            此操作将删除当前条目与所有子条目和用户关系，确定删除？
          </Modal>
        </Sider>
        <Layout>
          <Content style={{ backgroundColor: '#fff', padding: 20 }}>
            <UserRoomTable roomId={currentRoomId} />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
export default Room
