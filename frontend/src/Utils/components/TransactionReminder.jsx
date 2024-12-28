import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

const cardClasses = "bg-black flexWihCol smallText dark:bg-card-foreground mb-4 text-white dark:text-card min-w-[40vw] p-4 rounded-lg shadow-md max-w-sm mx-auto mt-8";
const textClasses = "text-xs text-muted-foreground text-sm font-semibold";
const buttonClasses = "bg-white text-black hover:bg-primary/80 mt-4 px-4 py-2 rounded-md";

const TransactionReminder = () => {
    // State variables for the form inputs
    const [transactionDate, setTransactionDate] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    // Get today's date in 'YYYY-MM-DD' format
    const today = new Date().toISOString().split('T')[0];

    const handleTransactionReminder = () => {
        const user_id = sessionStorage.getItem('user_id');

        axiosInstance.post('/reminders', { transactionDate, name, amount, user_id })
            .then(response => {
                navigate('/transactionremind');
            })
            .catch(error => {
                console.error('Error setting reminder:', error);
            });
    };

    return (
        <div className='w-screen min-h-screen flex'>
            <Navbar />
            <div className='flex-1 p-4 ml-[24%] w-[75%]'>
                <div className={cardClasses}>
                    <h2 className="text-lg font-semibold mb-2">Transaction Reminder</h2>
                    <p className="text-sm mb-4">Don't forget about your upcoming transaction!</p>
                    <div className="mb-4">
                        <label className="block text-xs text-slate-300 mb-4">Transaction Date</label>
                        <input
                            type="date"
                            value={transactionDate}
                            onChange={(e) => setTransactionDate(e.target.value)}
                            min={today} // Set the min date to today's date
                            className="border border-gray-300 p-2 text-black rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs text-slate-300 mb-4">Name</label>
                        <input
                            type="text"
                            value={name}
                            maxLength="20"
                            placeholder='Name should not exceed 20 characters'
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 p-2 text-black rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs text-slate-300 mb-4">Amount</label>
                        <input
                            type="number"
                            step="100"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="border border-gray-300 p-2 text-black rounded-md w-full"
                        />
                    </div>

                    <button
                        className={buttonClasses}
                        onClick={handleTransactionReminder}
                    >
                        Set Reminder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionReminder;
