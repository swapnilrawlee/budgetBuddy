import React, { useEffect, useState } from 'react';
import axiosInstance from '../Utils/axios'; // Ensure axiosInstance is correctly set up

const RecentTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const response = await axiosInstance.get('/transactionapi/recenttransactions',{
                    params: { user_id },
                });                 
                setTransactions(response.data);
            } catch (err) {
                setError('Error fetching transactions.');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) return <div className="p-6 rounded-lg mt-2 shadow-md">Loading...</div>;
    if (error) return <div className="p-6 rounded-lg mt-2 shadow-md">{error}</div>;

    return (
        <section className="mt-6  rounded-lg   shadow-md p-2 ">
            <h3 className="text-xl font-semibold">Recent Transactions</h3>
            <div className=" mt-2  capitalize   w-full mb-4  flex flex-col items-center justify-between">
                {transactions.length === 0 ? (
            <p className="text-gray-500">No recent transactions.</p>
        ) : (
                    transactions.map((transaction) => (
                        <div key={transaction.id} className="flex justify-between mb-4 w-full p-4 rounded-lg shadow-md bg-blue-300 text-blue-900">
                            <div className={`text-blue-900 font-semibold `}>{transaction.category}</div>
                            <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-900' : 'text-red-900'}`}>
                                ₹{transaction.amount}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default RecentTransactions;
