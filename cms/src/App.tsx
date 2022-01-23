import { PageHeader } from 'antd'
import React from 'react'
import { Suspense, useMemo } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './App.less'
import { Dashboard, Role } from './page/Dashboard'
import { Login } from './page/Login/Login'
import { authRouter, commonRouter } from './router'
import { useSelector } from './store'

function App() {
  const role = useSelector((state) => state.adminUserInfo.role)
  const router = useMemo(() => {
    return role === Role.SuperAdmin
      ? [...commonRouter, ...authRouter]
      : commonRouter
  }, [role])
  const navigate = useNavigate()
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="/dashboard" element={<Dashboard router={router} />}>
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/home" />}
          />
          {router.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <PageHeader
                    className="site-page-header"
                    onBack={() => navigate(-1)}
                    title={item.title}
                  />
                  {<item.component />}
                </Suspense>
              }
            />
          ))}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/no-permission" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
