import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axiosInstance from '../axios';

const Reports = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [total, setTotal] = useState(0);
  const [netBalance, setNetBalance] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], expenses: [], income: [] });
  const [report, setReport] = useState([]);

  const handleTransaction = async () => {
    const user_id = localStorage.getItem('user_id');
    const response = await axiosInstance.get('/transactionapi/transactions/summary',{
      params: {user_id}
    });
    setTotalExpense(response.data.total_expenses);
    setTotalIncome(response.data.total_income);
  };

  const handleTotal = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      const response = await axiosInstance.get('/transactionapi/transactions/total',{
        params: {user_id}
      });
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching transaction summary:', error);
    }
  };

  const handleNetBalance = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      const response = await axiosInstance.get('/transactionapi/transactions/net-balance',{
        params: {user_id}
      });

      setNetBalance(response.data.net_balance);
    } catch (error) {
      console.error('Error fetching transaction summary:', error);
    }
  };

  const fetchChartData = async () => {
    try {
      const user_id = localStorage.getItem('user_id');

      const response = await axiosInstance.get('/transactionapi/transactions/chart-data',{
        params: {user_id}
      });
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };
  const fetchreport = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      const response = await axiosInstance.get('/transactionapi/transactions/report',{
        params: {user_id}
      });
      setReport(response.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    handleTransaction();
    handleTotal();
    handleNetBalance();
    fetchChartData();
    fetchreport();
  }, []);

  return (
    <div className='w-screen min-h-screen flex'>
      <Navbar />
      <div className="ml-[25%] w-[75%] min-h-screen p-6">
        <h1 className="text-4xl font-bold mb-6">Financial Reports</h1>

        {/* Filters */}
        <div className="bg-card p-6 rounded-lg mb-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select className="block w-full p-3 border border-input rounded-lg focus:ring focus:ring-primary">
              <option value="" selected disabled>Date</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
            </select>
            <select className="block w-full p-3 border border-input rounded-lg focus:ring focus:ring-black">
              <option value="" selected disabled>Category</option>
              <option value="income">Income</option>
              <option value="expenses">Expenses</option>
            </select>
          </div>
        </div>

        {/* Report Summary */}
        <div className="bg-card p-6 rounded-lg mb-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Report Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-accent p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold">₹{totalExpense}</p>
            </div>
            <div className="bg-accent p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Income</p>
              <p className="text-2xl font-bold">₹{totalIncome}</p>
            </div>
            <div className="bg-accent p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Savings</p>
              <p className="text-2xl font-bold">₹{netBalance}</p>
            </div>
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="bg-card p-6 rounded-lg mb-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Detailed Reports</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="p-2 border-b">Date</th>
                <th className="p-2 border-b">Category</th>
                <th className="p-2 border-b">Amount</th>
             
              </tr>
            </thead>
            <tbody>
            {report.map((elem, index) => (
          <tr key={index} className="hover:bg-muted">
            <td className="p-2 border-b">{elem.date}</td>
            <td className="p-2 border-b">{elem.category}</td>
            <td className="p-2 border-b">{elem.amount}</td>
          </tr>
        ))}
            </tbody>
          </table>
        </div>

        {/* Visualizations */}

        {/* Export Options */}
        <div className="bg-card p-6 rounded-lg mb-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Export Options</h2>
          <div className="flex space-x-4">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow hover:bg-primary/80 transition">Export as PDF</button>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow hover:bg-primary/80 transition">Export as CSV</button>
          </div>
        </div>

        {/* Search Reports */}
        <div className="bg-card p-6 rounded-lg mb-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Search Reports</h2>
          <input type="text" placeholder="Search reports..." className="w-full p-3 border border-input rounded-lg focus:ring focus:ring-primary" />
        </div>
      </div>
    </div>
  );
};

export default Reports;
