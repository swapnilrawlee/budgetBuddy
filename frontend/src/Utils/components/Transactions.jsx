import React from 'react'
import Navbar from '../../components/Navbar'

const Transactions = () => {
  return (
    <div className='w-screen h-screen flex justify-between  '>
    <Navbar/>
    <div className="w-[78%] h-[90%] p-6 rounded flex flex-col gap-6 mr-4 mt-6 border  shadow-black shadow-lg">
    <form className='flex gap-2 justify-center items-center mt-6 ' >
      <input type="text" placeholder="Search transactions..." className="rounded p-2 w-[40%] border border-black"/>
      <div className="flex gap-2 ">
        <button className="rounded p-2 bg-blue-500 text-white">Add Transaction</button>
        <button className="rounded p-2 bg-gray-500 text-white">Export to Excel</button>
      </div>
  
    </form>
  </div>   
  </div>   )
}

export default Transactions