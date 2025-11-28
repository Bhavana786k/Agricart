import Entry from "./pages/Entry"
import './App.css'
import Register from "./pages/Register"
import Login from "./auth/Login"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AdminHome from "./admin/AdminHome"
import CustomerHome from './pages/CustomerHome'

function App() {

  return (
    <>
      < Router >
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/customer" element={<CustomerHome />} />
        </Routes>
      </Router >
    </>
  )
}

export default App


