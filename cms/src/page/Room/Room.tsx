import { HomeOutlined } from '@ant-design/icons'
import { Card, Layout, Menu, message, Tree } from 'antd'
import { EventDataNode } from 'antd/lib/tree'
import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchBuildingApi, fetchRoomApi, fetchUnitApi } from '../../api/room'
import { UserRoomTable } from './UserRoomTable'
const { Sider, Content } = Layout
export type Room = { _id: string; num: number }
export type Unit = { _id: string; num: number }
export type Building = {
  _id: string
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
  const [currentRoomId, setCurrentRoomId] = useState('')
  const [rightMenuPosition, setRightMenuPosition] = useState([0, 0])
  const [rightMenuShow, setRightMenuShow] = useState(false)
  const treeBarRef = useRef<HTMLDivElement>(null)
  const getBuildings = useCallback(() => {
    fetchBuildingApi().then((res) => {
      if (res.code === 0) {
        setTreeData([
          {
            ...community,
            children: res.data.map((building) => {
              return {
                title: `${building.num}号楼`,
                data: building,
                key: building._id,
                type: 'building',
              }
            }),
          },
        ])
      }
    })
  }, [])
  useEffect(() => {
    getBuildings()
  }, [getBuildings])
  const onLoadData = async (treeNode: EventDataNode) => {
    const hideLoading = message.loading('加载中...')
    const currNode = treeNode as EventDataNode & DataNode

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
                key: unit._id,
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
                key: room._id,
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
    hideLoading()
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
    const treeBarPosition = treeBarRef.current?.getBoundingClientRect()
    const { pageX, pageY } = info.event
    setRightMenuPosition([
      pageX - treeBarPosition!.x,
      pageY - treeBarPosition!.y,
    ])
    setRightMenuShow(true)
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
          }}
          onClick={onSiderBarClick}
          ref={treeBarRef}
          width={220}
        >
          {rightMenuShow && (
            <Card
              hoverable
              style={{
                width: 100,
                position: 'absolute',
                left: rightMenuPosition[0],
                top: rightMenuPosition[1],
                zIndex: 1,
              }}
              bodyStyle={{ padding: 0 }}
            >
              <Menu>
                <Menu.Item key="1">创建</Menu.Item>
                <Menu.Item key="2">删除</Menu.Item>
              </Menu>
            </Card>
          )}
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
        </Sider>
        <Layout>
          <Content>
            <UserRoomTable roomId={currentRoomId} />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
export default Room
