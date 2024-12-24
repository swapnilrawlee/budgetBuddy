import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import axiosInstance from "../axios";

const Budget = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Always fetch the transactions from the database every time the component is mounted
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const user_id = localStorage.getItem("user_id");
      const response = await axiosInstance.get("/transactionapi/transactions", {
        params: { user_id },
      });

      // Debugging log to inspect the API response
      // console.log("API response:", response);

      if (Array.isArray(response.data)) {
        setTransactions(response.data);
      } else {
        console.error("Expected an array of transactions but got:", response);
        setTransactions([]);  // Clear existing data in case of error
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Error fetching transactions.");
    } finally {
      setLoading(false);
    }
  };

  const handleTransaction = useCallback(async (type) => {
    if (!category || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Invalid category or amount.");
      return;
    }

    const user_id = localStorage.getItem("user_id");
    const newTransaction = {
      category,
      amount: parseFloat(amount),
      type,
      user_id,
    };

    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post(
        "/transactionapi/transactions",
        newTransaction
      );
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        response.data,
      ]);
      setCategory("");
      setAmount("");
      // Optionally, refetch transactions to get the latest data
      fetchTransactions();
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
      setError(`Error adding ${type}.`);
    } finally {
      setLoading(false);
    }
  }, [category, amount]);

  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      let userId = localStorage.getItem("user_id");
      await axiosInstance.delete(
        `/transactionapi/transactions/${id}?user_id=${userId}`
      );
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
      // Optionally, refetch transactions to get the latest data
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setError("Error deleting transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-between">
      <Navbar />
      <div className="ml-[25%] w-[75%] h-full rounded flex border mr-3 shadow-black shadow-lg flex-col gap-6 p-6">
        <h1 className="text-4xl">Budget</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="rounded p-2 border border-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="rounded p-2 border border-black"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => handleTransaction("income")}
              className="bg-green-600 py-2 px-4 rounded capitalize"
              disabled={loading}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => handleTransaction("expense")}
              className="bg-red-600 py-2 px-4 rounded capitalize"
              disabled={loading}
            >
              Expense
            </button>
          </div>
        </form>
        {loading && <p className="text-gray-500">Loading...</p>}
        <div className="mt-6">
          <h2 className="text-2xl">Transactions</h2>
          <ul className="mt-4">
            {Array.isArray(transactions) && transactions.length > 0 ? (
              transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="flex justify-between items-center mb-4 capitalize"
                >
                  <span>
                    {transaction.type === "income" ? (
                      <span className="text-green-600">[Income]</span>
                    ) : (
                      <span className="text-red-600">[Expense]</span>
                    )}
                    {` ${transaction.category}: ₹${transaction.amount}`}
                  </span>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="bg-red-500 py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>No transactions available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Budget;
