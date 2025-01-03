import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axiosInstance from "../axios";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      transactionSearch();
    } else {
      setTransactions([]); // Clear the results when search term is empty
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const transactionSearch = async () => {
    try {
      const userId = sessionStorage.getItem("user_id"); // Get user_id from sessionStorage 
      if (!userId) {
        console.error("User ID not found in local storage");
        return;
      }

      const response = await axiosInstance.get(
        "/searchtransactionapi/transactions",
        {
          params: { search: searchTerm, user_id: userId },
        }
      );

      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleExportToExcel = () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      console.error("User ID not found in sessionStorage");
      return;
    }

    axiosInstance({
      url: "/searchtransactionapi/transactions/export",
      method: "GET",
      params: { user_id: userId },
      responseType: "blob", // Specify response type as blob for file download
    })
      .then((response) => {
        // Create a URL for the blob and trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "transactions.xlsx"); // Filename for the downloaded file
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => console.error("Error exporting transactions:", error));
  };

  return (
    <div className="w-screen h-screen flex justify-between">
      <Navbar />
      <div className="w-[75%] ml-[25%] homemain h-full p-6 rounded flex flex-col gap-6">
        <form
          className="flex gap-2 justify-center items-center mt-6"
          onSubmit={(e) => e.preventDefault()} // Prevent page reload on form submit
        >
          <input
            type="text"
            placeholder="Search transactions..."
            className="rounded p-2 w-[40%] border border-black"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded p-2 bg-blue-500 text-white"
              onClick={handleExportToExcel}
            >
              Export to Excel
            </button>
          </div>
        </form>

        {/* Displaying the transactions */}
        <div className="mt-6 ">
          {transactions.length > 0 ? (
            <ul>
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="mb-2 text-l midText capitalize  p-2 rounded-lg flex  gap-3"
                >
                  <p>{transaction.category}</p>
                  <p> ₹{transaction.amount} </p>
                  <div
                    className={`font-semibold ${
                      transaction.type === "income"
                        ? "text-green-900"
                        : "text-red-900"
                    }`}
                  >
                    {transaction.type}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center capitalize ">No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
