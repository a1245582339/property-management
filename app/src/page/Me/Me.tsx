import { Avatar, Button, ImageUploader, List, NavBar, Toast } from 'antd-mobile'
import { EditFill } from 'antd-mobile-icons'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  fetchUserInfoApi,
  logoutApi,
  updateUserInfoApi,
  uploadFileApi,
} from '../../api/user'

export type UserInfo = {
  _id: number
  name: string
  avatar: string
  phoneNumber: string
}

export const Me: React.FC = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
  const getUserInfo = useCallback(async () => {
    const res = await fetchUserInfoApi()
    if (res.code === 0) {
      setUserInfo(res.data)
    }
  }, [])
  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])
  const onNameClick = () => {
    navigate(`/editName/${userInfo?.name}`)
  }
  const logout = () => {
    logoutApi().then(() => {
      navigate('/login', { replace: true })
    })
  }
  const upload = async (file: File) => {
    Toast.show({
      icon: 'loading',
      content: '上传中…',
    })
    const uploadRes = await uploadFileApi(file)
    const url = uploadRes.data.url
    const res = await updateUserInfoApi({ avatar: url })
    if (res.code === 0) {
      Toast.show({
        icon: 'success',
        content: '上传成功',
      })
      Toast.clear()
      getUserInfo()
    }
    return {
      url: '',
    }
  }
  return (
    <>
      <NavBar style={{ backgroundColor: '#fff' }} back={null}>
        个人信息
      </NavBar>
      {userInfo && (
        <div
          style={{
            marginTop: 50,
            marginBottom: 30,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={upload}
          >
            <div
              style={{
                width: 80,
                height: 80,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Avatar
                style={{
                  '--size': '64px',
                }}
                src={`http://localhost:7001${userInfo.avatar}`}
              />
              <EditFill
                color="var(--adm-color-weak)"
                style={{ position: 'relative', right: 16, top: 46 }}
              />
            </div>
          </ImageUploader>
        </div>
      )}
      {userInfo && (
        <List>
          <List.Item extra={userInfo.phoneNumber}>手机号</List.Item>
          <List.Item extra={userInfo.name} clickable onClick={onNameClick}>
            用户名
          </List.Item>
          <List.Item
            clickable
            onClick={() => {
              navigate('/messageBoard')
            }}
          >
            留言板
          </List.Item>
        </List>
      )}
      <Button
        style={{ marginTop: 20 }}
        onClick={logout}
        block
        type="submit"
        color="default"
        size="large"
      >
        退出登录
      </Button>
    </>
  )
}
