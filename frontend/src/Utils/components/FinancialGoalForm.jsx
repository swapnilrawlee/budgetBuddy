import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";

const sharedClasses = {
  formInput: "form-input p-2 border-2",
  formSelect: "form-select",
  formTextarea: "form-textarea",
  bgPrimary: "bg-primary",
  textPrimaryForeground: "text-black",
  bgDestructive: "bg-red-400",
  textDestructiveForeground: "text-destructive-foreground",
  hoverBgPrimary: "hover:bg-primary/80",
  hoverBgDestructive: "hover:bg-destructive/80",
};

const FinancialGoalForm = () => {
  const Navigate =useNavigate()
  const [formData, setFormData] = useState({
    user_id: '',
    goal_name: '',
    target_amount: '',
    current_savings: '',
    deadline: '',
    priority_level: '',
    notes: ''
  });
  const [user_id, setUserId] = useState('');
  useEffect(() => {
    // Retrieve user_id from localStorage
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
    setFormData(prevFormData => ({
      ...prevFormData,
      user_id: storedUserId
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/goals/creategoal', { ...formData, user_id });
      setFormData({
        user_id: '',
        goal_name: '',
        target_amount: '',
        current_savings: '',
        deadline: '',
        priority_level: '',
        notes: ''
      });
      Navigate('/goals')
    } catch (error) {
      console.error('There was an error creating the goal!', error);
    }
  };

  return (
    <div className="w-screen min-h-screen flex">
      <Navbar />
      <div className="flex-1 p-4 ml-[24%] w-[50%]">
        <div className="text-black p-6 rounded-lg shadow-lg flex flex-col gap-5">
          <h2 className="text-2xl font-semibold mb-4">Add New Financial Goal</h2>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="mb-4 flex flex-col gap-5">
              <label htmlFor="goalName" className="block text-sm font-medium">Goal Name</label>
              <input
                type="text"
                id="goalName"
                name="goal_name"
                value={formData.goal_name}
                placeholder="Enter goal name"
                className={sharedClasses.formInput}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4 flex flex-col gap-5">
              <label htmlFor="targetAmount" className="block text-sm font-medium">Target Amount</label>
              <input
                type="number"
                id="targetAmount"
                name="target_amount"
                value={formData.target_amount}
                placeholder="Enter target amount"
                className={sharedClasses.formInput}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4 flex flex-col gap-5">
              <label htmlFor="currentSavings" className="block text-sm font-medium">Current Savings</label>
              <input
                type="number"
                id="currentSavings"
                name="current_savings"
                value={formData.current_savings}
                placeholder="Enter current savings"
                className={sharedClasses.formInput}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4 flex flex-col gap-5">
              <label htmlFor="deadline" className="block text-sm font-medium">Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                className={sharedClasses.formInput}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4 flex flex-col gap-5">
              <label htmlFor="priorityLevel" className="block text-sm font-medium">Priority Level</label>
              <select
                id="priorityLevel"
                name="priority_level"
                value={formData.priority_level}
                className={sharedClasses.formSelect}
                onChange={handleChange}
                required
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="mb-4 flex flex-col gap-5">
              <label htmlFor="notes" className="block text-sm font-medium">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                placeholder="Enter notes"
                className={sharedClasses.formTextarea}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className={`${sharedClasses.bgPrimary} ${sharedClasses.textPrimaryForeground} text-white px-4 py-2 rounded-md ${sharedClasses.hoverBgPrimary}`}
              >
                Save
              </button>
              <button
                type="button"
                className={`${sharedClasses.bgDestructive} ${sharedClasses.textDestructiveForeground} px-4 py-2 rounded-md ${sharedClasses.hoverBgDestructive}`}
                onClick={() => setFormData({
                  user_id: '',
                  goal_name: '',
                  target_amount: '',
                  current_savings: '',
                  deadline: '',
                  priority_level: '',
                  notes: ''
                })}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinancialGoalForm;
