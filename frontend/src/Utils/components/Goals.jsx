import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axios';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');

    if (userId) {
      axiosInstance.get('/goals/getGoals', {
        params: { user_id: userId },
      })
        .then(response => {
          // Convert string amounts to numbers
          const formattedGoals = response.data.map(goal => ({
            ...goal,
            target_amount: parseFloat(goal.target_amount),
            current_savings: parseFloat(goal.current_savings),
          }));
          setGoals(formattedGoals);
          if (formattedGoals.length > 0) {
            setSelectedGoal(formattedGoals[0]); 
          }
        })
        .catch(error => {
          console.error('Error fetching goals:', error);
          alert('An error occurred while fetching your goals.');
        });
    } else {
      console.error('No user_id found in sessionStorage');
    }
  }, []);

  // Handle delete goal
  const handleDeleteGoal = (goalId) => {
    axiosInstance.delete(`/goals/deleteGoal/${goalId}`)
      .then(() => {
        setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
        if (selectedGoal && selectedGoal.id === goalId) {
          setSelectedGoal(null);
        }
      })
      .catch(error => {
        console.error('Error deleting goal:', error);
        alert('An error occurred while deleting the goal.');
      });
  };

  const calculateProgressPercentage = (current_savings, target_amount) => {
    if (target_amount > 0) {
      return (current_savings / target_amount) * 100;
    }
    return 0;
  };

  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (goals.length === 0) return 0;

    const totalTarget = goals.reduce((acc, goal) => acc + goal.target_amount, 0);
    const totalSaved = goals.reduce((acc, goal) => acc + goal.current_savings, 0);

    return totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;
  };

  // Calculate total savings of all goals
  const calculateTotalSavings = () => {
    return goals.reduce((acc, goal) => acc + goal.current_savings, 0);
  };

  return (
    <div className='w-screen min-h-screen flex'>
      <Navbar />
      <div className='flex-1 p-4 ml-[24%] marginmedia w-[75%]'>
        <header className="bg-secondary text-secondary p-4">
          <h1 className="text-2xl font-bold">Goals</h1>
        </header>
        <div className="bg-card p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Financial Goals</h2>
          {goals.length === 0 ? (
            <p>No goals found. Add a new goal to get started.</p>
          ) : (
            <ul className="divide-y divide-zinc-200">
              {goals.map(goal => (
                <li
                  key={goal.id}
                  className={`flex justify-between  items-center py-2 ${selectedGoal?.id === goal.id ? 'bg-zinc-200 ' : ''}`}
                  onClick={() => setSelectedGoal(goal)}
                >
                  <span className='w-[30%] capitalize'>₹{goal.target_amount}</span>
                  <span className='w-[30%] capitalize'>{goal.goal_name}</span>
                  <span className='w-[30%] capitalize'>₹{goal.current_savings}</span>
                  <button
                    className="text-red-500 ml-2 w-[10%]"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from toggling selection
                      handleDeleteGoal(goal.id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedGoal && (
          <div className="bg-card p-4 mt-4">
            <h2 className="text-lg font-bold mb-2">Goal Details</h2>
            <div className="flex justify-between items-center py-2">
              <span>Target Amount: ₹{selectedGoal.target_amount}</span>
              <span>Amount Saved: ₹{selectedGoal.current_savings}</span>
            </div>
            <div className="bg-zinc-200 h-2 w-full rounded-lg mt-2">
              <div
                className="bg-green-600 h-full rounded-lg"
                style={{ width: `${calculateProgressPercentage(selectedGoal.current_savings, selectedGoal.target_amount)}%` }}
              ></div>
            </div>
          </div>
        )}
   
        <div className="bg-card p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Overall Progress Visualization</h2>
          <div className="bg-zinc-200 h-2 w-full rounded-lg mt-2">
            <div
              className="bg-green-600 h-full rounded-lg"
              style={{ width: `${calculateOverallProgress()}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-card p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Total Savings</h2>
          <p>₹{calculateTotalSavings()}</p>
        </div>
        <button className="bg-white bg-primary text-primary-foreground ml-3 py-2 px-4 rounded-lg mt-4">
          <Link to="/newgoal">Add New Goal</Link>
        </button>
      </div>
    </div>
  );
};

export default Goals;
