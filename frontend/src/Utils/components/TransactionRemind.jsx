import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";

const cardClasses =
  "bg-black  smallText dark:bg-card-foreground text-white  remindbox dark:text-card p-4 min-w-[50vw] rounded-lg  shadow-md max-w-sm mx-auto mt-8";
const textClasses = "text-xs text-muted-foreground text-sm font-semibold";
const buttonClasses =
  "bg-white text-black hover:bg-white/80 mt-4 px-4 py-2 rounded-md";
const deleteButtonClasses =
  "bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded-md";

const TransactionRemind = () => {
  const [data, setData] = useState([]);

  const handleTransactionReminder = async () => {
    const user_id = sessionStorage.getItem("user_id");

    try {
      const response = await axiosInstance.get("/reminders", {
        params: { user_id },
      });
      setData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const deleteReminder = async (id) => {
    try {
      await axiosInstance.delete(`/reminders/${id}`);
      setData(data.filter((reminder) => reminder.id !== id));
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    handleTransactionReminder();
  }, []);

  return (
    <div className="w-screen min-h-screen flex justify-between">
      <Navbar />
      <div className="w-[75%] ml-[25%] homemain h-full p-6 rounded flex flex-col gap-6">
        <div className={cardClasses}>
          <h2 className="text-lg font-semibold mb-2">Transaction Reminder</h2>
          <p className="text-sm mb-4">
            Don't forget about your upcoming transactions!
          </p>
          {data.length === 0 ? (
            <p className="text-gray-500">No transactions</p>
          ) : (
            <table className="min-w-full smallText  table-auto">
              <thead>
                <tr>
                  <th className="text-gray-400 px-4 py-2 text-left">Date</th>
                  <th className="text-gray-400 px-4 py-2 text-left">Name</th>
                  <th className="text-gray-400 px-4 py-2 text-left">Amount</th>
                  <th className="text-gray-400 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e) => (
                  <tr key={e.id}>
                    <td className="">
                      {formatDate(e.transaction_date)}
                    </td>
                    <td className="capitalize px-4 py-2">{e.name}</td>
                    <td className=" px-4 py-2">₹{e.amount}</td>
                    <td className=" px-4 py-2">
                      <button
                        className={deleteButtonClasses}
                        onClick={() => deleteReminder(e.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Link to="/transactionreminder">
            <button className={buttonClasses}>Create New Reminder</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransactionRemind;
