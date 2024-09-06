import React from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'

const Goals = () => {
  return (
    <div className='w-screen min-h-screen flex'>
      <Navbar />
      <div className='flex-1 p-4  ml-[24%] w-[75%] '>
        <header className="bg-secondary text-secondary p-4">
          <h1 className="text-2xl font-bold">Goals</h1>
        </header>
        <div className="bg-card p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Financial Goals</h2>
          <ul className="divide-y divide-zinc-200">
            <li className="flex justify-between items-center py-2">
              <span>Buy a new car</span>
              <span>₹20,000</span>
            </li>
            <li className="flex justify-between items-center py-2">
              <span>Travel the world</span>
              <span>₹10,000</span>
            </li>
            <li className="flex justify-between items-center py-2">
              <span>Renovate the house</span>
              <span>₹30,000</span>
            </li>
          </ul>
        </div>
        <div className="bg-card p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Goal Details</h2>
          <div className="flex justify-between items-center py-2">
            <span>Target Amount: ₹20,000</span>
            <span>Amount Saved: ₹5,000</span>
          </div>
          <div className="bg-zinc-200 h-2 w-full rounded-lg mt-2">
            <div
              className="bg-secondary h-full rounded-lg"
              style={{ width: '25%' }}
            ></div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <button className="text-secondary hover:text-secondary/80">
            <img aria-hidden="true" alt="edit" src="https://placehold.co/24?text=✏️" />
          </button>
          <button className="text-destructive hover:text-destructive/80">
            <img aria-hidden="true" alt="delete" src="https://placehold.co/24?text=❌" />
          </button>
        </div>
        <div className="bg-card p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Progress Visualization</h2>
          <div className="bg-zinc-200 h-2 w-full rounded-lg mt-2">
            <div
              className="bg-secondary h-full rounded-lg"
              style={{ width: '60%' }}
            ></div>
          </div>
        </div>
        <button className="bg-white bg-primary text-primary-foreground  ml-3 py-2 px-4 rounded-lg mt-4">
          <Link to={"/newgoal"}>          Add New Goal
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Goals
