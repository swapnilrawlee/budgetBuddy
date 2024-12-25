import React, { useEffect, useState } from "react";
import axios from "axios";

const cardClasses =
  "bg-card dark:bg-card-foreground text-card-foreground dark:text-card p-4 min-w-full rounded-lg shadow-md max-w-sm mx-auto mt-8";
const textClasses = "text-xs text-muted-foreground text-sm font-semibold";
const upcomingTransactionClasses =
  "bg-blue-300 text-blue-900 p-4 rounded-lg shadow-md w-full mb-4 flex items-center justify-between";

const UpcomingTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const fetchUpcomingTransactions = async () => {
    const user_id = sessionStorage.getItem("user_id");

    try {
      const response = await axios.get("http://localhost:3000/reminders/upcoming", {
        params: { user_id },
      });
      setTransactions(response.data);
    } catch (error) {
      setError("Error fetching upcoming transactions");
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchUpcomingTransactions();
  }, []);

  return (
  
        <div className={cardClasses}>
          <h2 className="text-lg font-semibold mb-2">Upcoming Transactions</h2>
          { transactions.length === 0 ? (
            <p className="text-gray-500">No upcoming transactions.</p>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className={upcomingTransactionClasses}>
                <div>
                  <p className="text-xs text-muted-foreground">Transaction Date</p>
                  <p className={textClasses}>{formatDate(transaction.transaction_date)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className={textClasses}>{transaction.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className={textClasses}>₹{transaction.amount}</p>
                </div>
              </div>
            ))
          )}
        </div>
     
  );
};

export default UpcomingTransaction;
