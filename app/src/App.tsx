import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './page/Login'
import { Main } from './page/Main'
import { Order } from './page/Order/Order'
import { Room } from './page/Room/Room'
import { Me } from './page/Me/Me'
import { OrderDetail } from './page/Order/OrderDetail'
import { CreateOrder } from './page/Order/CreateOrder'
import { Parking } from './page/Parking/Parking'
import { EditName } from './page/Me/EditName'
import { MessageBoard } from './page/Me/MessageBoard'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="main" />} />
        <Route path="login" element={<Login />} />
        <Route path="main" element={<Main />}>
          <Route path="/main" element={<Navigate to="/main/order" />} />
          <Route path="order" element={<Order />} />
          <Route path="parking" element={<Parking />} />
          <Route path="room" element={<Room />} />
          <Route path="me" element={<Me />} />
        </Route>
        <Route path="orderDetail/:orderId" element={<OrderDetail />} />
        <Route path="createOrder" element={<CreateOrder />} />
        <Route path="editName/:name" element={<EditName />} />
        <Route path="messageBoard" element={<MessageBoard />} />
      </Routes>
    </div>
  )
}

export default App
