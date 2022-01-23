import { Layout, Tree } from 'antd'
import { EventDataNode } from 'antd/lib/tree'
import { useCallback, useEffect, useState } from 'react'
import { fetchBuildingApi, fetchRoomApi, fetchUnitApi } from '../../api/room'
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
  type: 'room' | 'unit' | 'building'
  data: Room | Unit | Building
  children?: DataNode[]
}
const Room: React.FC = () => {
  const [treeData, setTreeData] = useState<DataNode[]>([])
  const getBuildings = useCallback(() => {
    fetchBuildingApi().then((res) => {
      if (res.code === 0) {
        setTreeData(
          res.data.map((building) => {
            return {
              title: `${building.num}号楼`,
              data: building,
              key: building._id,
              type: 'building',
            }
          })
        )
      }
    })
  }, [])
  useEffect(() => {
    getBuildings()
  }, [getBuildings])
  const onLoadData = async (treeNode: EventDataNode) => {
    const currNode = treeNode as unknown as EventDataNode & DataNode
    console.log(currNode)
    if (currNode.type === 'building') {
      fetchUnitApi({ buildingId: currNode.data._id }).then((res) => {
        if (res.code === 0) {
          setTreeData((origin) => {
            const newTree = [...origin]
            const [_, buildingIndex] = currNode.pos
              .split('-')
              .map((item) => Number(item))
            newTree[buildingIndex].children = res.data.map((unit) => {
              return {
                title: `${unit.num}单元`,
                data: unit,
                key: unit._id,
                type: 'unit',
              }
            })
            return newTree
          })
        }
      })
    } else if (currNode.type === 'unit') {
      fetchRoomApi({ unitId: currNode.data._id }).then((res) => {
        if (res.code === 0) {
          setTreeData((origin) => {
            const newTree = [...origin]
            const [_, buildingIndex, unitIndex] = currNode.pos
              .split('-')
              .map((item) => Number(item))
            newTree[buildingIndex].children![unitIndex].children = res.data.map(
              (room) => {
                return {
                  title: `${room.num}号`,
                  data: room,
                  key: room._id,
                  type: 'room',
                  isLeaf: true,
                }
              }
            )
            return newTree
          })
        }
      })
    }
  }
  return (
    <>
      <Layout style={{ padding: 30, height: 800 }}>
        <Sider theme="light" style={{ height: '100%', overflowY: 'auto' }}>
          <Tree loadData={onLoadData} treeData={treeData} />
        </Sider>
        <Layout>
          <Content>Content</Content>
        </Layout>
      </Layout>
    </>
  )
}
export default Room
