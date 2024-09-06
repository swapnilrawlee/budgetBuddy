import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

const Budget = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // Retrieve user ID from localStorage
      const user_id = localStorage.getItem("user_id");
            const response = await axios.get(
        "http://localhost:3000/transactionapi/transactions",{
          params: { user_id },
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Error fetching transactions.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleTransaction = async (type) => {
    if (!category || isNaN(amount) || amount <= 0) {
      setError("Invalid category or amount.");
      return;
    }

    const user_id = localStorage.getItem("user_id"); // Retrieve user ID from localStorage
    const newTransaction = {
      category,
      amount: parseFloat(amount),
      type,
      user_id,
    }; // Include user_id

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/transactionapi/transactions",
        newTransaction
      );
      setTransactions([...transactions, response.data]);
      setCategory("");
      setAmount("");
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
      setError(`Error adding ${type}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      let userId =localStorage.getItem("user_id");
      await axios.delete(
        `http://localhost:3000/transactionapi/transactions/${id}?user_id=${userId}`
      );
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
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
      <div className=" ml-[25%] w-[75%] h-full rounded flex border mr-3 shadow-black shadow-lg flex-col gap-6 p-6">
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
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => handleTransaction("expense")}
              className="bg-red-600 py-2 px-4 rounded capitalize"
            >
              Expense
            </button>
          </div>
        </form>
        {loading && <p className="text-gray-500">Loading...</p>}
        <div className="mt-6">
          <h2 className="text-2xl">Transactions</h2>
          <ul className="mt-4">
          {transactions.map((transaction ) => (
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
      onClick={() => {
        if (transaction.id) {
          handleDelete(transaction.id);
        } else {
          console.error("Transaction ID is undefined");
        }
      }}
      className="bg-red-500 py-1 px-2 rounded"
    >
      Delete
    </button>
  </li>
))}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Budget;
