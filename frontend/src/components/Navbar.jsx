import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'bg-white text-black p-2 text-3xl rounded-3xl' : ''
  const logoutHandler = () => {
    navigate('/')
    localStorage.removeItem('user_id')
  }

  return (
    <aside className={`w-1/4 min-h-screen p-6 bg-black text-white fixed`}>
      <h1 className="text-4xl font-bold mb-6">Budget Buddy</h1>
      <nav>
        <ul>
          <li>
            <Link to="/home" className={`block py-2 text-center text-lg ${isActive('/home')}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/transactions" className={`block py-2 text-center text-lg ${isActive('/transactions')}`}>
              Transactions
            </Link>
          </li>
          <li>
            <Link to="/budget" className={`block py-2 text-center text-lg ${isActive('/budget')}`}>
              Budget
            </Link>
          </li>
          <li>
            <Link to="/goals" className={`block py-2 text-center text-lg ${isActive('/goals')}`}>
              Goals
            </Link>
          </li>
          <li>
            <Link to="/reports" className={`block py-2 text-center text-lg ${isActive('/reports')}`}>
              Reports
            </Link>
          </li>
          <li>
            <Link to="/settings" className={`block py-2 text-center text-lg ${isActive('/settings')}`}>
              Settings
            </Link>
          </li>
          <li>
            <Link to="/help" className={`block py-2 text-center text-lg ${isActive('/help')}`}>
              Help
            </Link>
          </li>
          <li>
            <Link to="/userprofile" className={`block py-2 text-center text-lg ${isActive('/userprofile')}`}>
              Userprofile
            </Link>
          </li>
        </ul>
      </nav>
      <button  onClick={logoutHandler} className="block mt-6 text-center bg-white p-2 rounded-3xl text-red-800 font-semibold text-lg">
        Logout
      </button >
    </aside>
  )
}

export default Navbar
