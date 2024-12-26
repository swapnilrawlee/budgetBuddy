import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'bg-white text-black p-2 text-3xl rounded-3xl' : ''
  const logoutHandler = () => {
    navigate('/')
    sessionStorage.removeItem('user_id');
  }

  return (
    <aside className={`w-1/4 min-h-screen navbar p-6 bg-black text-white fixed `}>
      <h1 className="text-4xl bigText font-bold mb-6">Budget Buddy</h1>
      <nav>
        <ul>
          <li>
            <Link to="/home" className={`block midText py-2 text-center text-lg ${isActive('/home')}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/transactions" className={`block midText py-2 text-center text-lg ${isActive('/transactions')}`}>
              Transactions
            </Link>
          </li>
          <li>
            <Link to="/budget" className={`block py-2 midText  text-center text-lg ${isActive('/budget')}`}>
              Budget
            </Link>
          </li>
          <li>
            <Link to="/transactionremind" className={`block py-2 midText text-center text-lg ${isActive('/transactionremind')}`}>
              Reminder
            </Link>
          </li>
          <li>
            <Link to="/goals" className={`block py-2 midText text-center text-lg ${isActive('/goals')}`}>
              Goals
            </Link>
          </li>
          <li>
            <Link to="/reports" className={`block py-2 midText  text-center text-lg ${isActive('/reports')}`}>
              Reports
            </Link>
          </li>
          <li>
            <Link to="/settings" className={`block py-2 midText text-center text-lg ${isActive('/settings')}`}>
              Settings
            </Link>
          </li>
          <li>
            <Link to="/help" className={`block py-2 midText  text-center text-lg ${isActive('/help')}`}>
              Help
            </Link>
          </li>
          <li>
            <Link to="/userprofile" className={`block py-2 midText text-center text-lg ${isActive('/userprofile')}`}>
              Userprofile
            </Link>
          </li>
      
        </ul>
      <button  onClick={logoutHandler} className="mt-6 block py-2 midText text-center w-full bg-red-500  rounded-3xl text-black font-semibold text-lg">
        Logout
      </button >
      </nav>
    </aside>
  )
}

export default Navbar
