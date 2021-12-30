import { useEffect } from 'react'
import { fetchAdminUserInfoApi, loginApi } from './api/admin'
import md5 from 'md5'
import './App.css'

function App() {
  useEffect(() => {
    loginApi({ tel: '13333333333', password: md5('000000') }).then(() => {
      fetchAdminUserInfoApi()
    })
  })

  return <div className="App"></div>
}

export default App
