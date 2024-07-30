import { Routes, Route } from 'react-router-dom'
import { NewAcout } from '../Pages/NewAcout'
import { Home } from '../Pages/Home'
import { NotFound } from '../Pages/NotFound'
import { Login } from '../Pages/Login'
import { Dashboard } from '../Pages/Dashboard'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/newAcount" element={<NewAcout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
