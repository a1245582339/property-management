import instance from './config'

export const loginApi = async  (body: {tel: string, password: string}) => {
   const res = await instance.post('api_admin_token', body)
   return res
}

export const fetchAdminUserInfoApi = async () => {
    const res = await instance.get('api_admin_auth')
    return res
}