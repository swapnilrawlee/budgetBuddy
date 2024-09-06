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
        <section className="mt-6">
            <h3 className="text-xl font-semibold">Recent Transactions</h3>
            <div className="p-6 rounded-lg mt-2 shadow-md capitalize">
                {transactions.length === 0 ? (
                    <div>No recent transactions</div>
                ) : (
                    transactions.map((transaction) => (
                        <div key={transaction.id} className="flex justify-between mb-4">
                            <div className={`text-gray-700 `}>{transaction.category}</div>
                            <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
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
