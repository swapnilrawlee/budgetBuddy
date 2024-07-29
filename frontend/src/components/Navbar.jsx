import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const Navigate =useNavigate()
  return (

    <div className='w-[20%] h-full bg-red-800 text-white  p-5 flex flex-col justify-center items-center gap-7'>
      <h1 className='text-4xl'>BudgetBuddy</h1>
      {["home", "transactions", "budget", "goals", "reports", "settings", "help",'userprofile'].map((e, index) => {
        return (
          <NavLink
            to={`/${e}`}
            key={index}
            activeClassName="active "
            className='text-2xl capitalize'
          >
            {e}
          </NavLink>
        )
      })}
      <button className="w-[200px] h-[50px] bg-white text-black rounded-md p-2" onClick={()=>Navigate('/login')}>
        Logout
      </button>
    </div>
  )
}

export default Navbar
