import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../Utils/userContext";
import axios from "axios";
import RecentTransaction from "./RecentTransactions";
import axiosInstance from "../Utils/axios";
import UpcomingTransaction from "./UpcomingTransactions";

const Homepage = () => {
  const [weather, setWeather] = useState({});
  const [greet, setGreet] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState ("");
  const [totalIncome, setTotalIncome] = useState("");
  const [totalExpense, setTotalExpense] = useState("");
  const [total, setTotal] = useState(0);
  const [netBalance, setNetBalance] = useState("");

  const { userdata } = useContext(UserContext);

  const handleClick = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    let timeOfDay;
    if (hours < 12) {
      timeOfDay = "Morning";
    } else if (hours < 18) {
      timeOfDay = "Afternoon";
    } else if (hours < 21) {
      timeOfDay = "Evening";
    } else {
      timeOfDay = "Night";
    }
    setHours(hours);
    setMinutes(minutes);
    setGreet(timeOfDay);
  };

  const WeatherApi = async () => {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=1284ea18df9d31cafd3165c6b33bebe6&units=metric"
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handletransaction = async () => {
    const user_id = sessionStorage.getItem("user_id");

    const response = await axiosInstance.get(
      "/transactionapi/transactions/summary",
      { params: { user_id } }
    );

    setTotalExpense(response.data.total_expenses);
    setTotalIncome(response.data.total_income);
  };

  const handletotal = async () => {
    try {
      const user_id = sessionStorage.getItem("user_id");
      const response = await axiosInstance.get(
        "/transactionapi//transactions/total",
        { params: { user_id } }
      );
      console.log(response);
      
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching transaction summary:", error);
    }
  };
  const handlenetbalance = async () => {
    try {
      const user_id = sessionStorage.getItem("user_id");

      const response = await axiosInstance.get(
        "/transactionapi/transactions/net-balance",
        { params: { user_id } }
      );

      setNetBalance(response.data.net_balance);
    } catch (error) {
      console.error("Error fetching transaction summary:", error);
    }
  };
  const userName = sessionStorage.getItem("user_name");

  useEffect(() => {
    handleClick();
    WeatherApi();
  }, []);

  useEffect(() => {
    handletransaction();
    handletotal();
    handlenetbalance();
  }, [totalIncome, totalExpense]);


  return (
    <div className="w-screen min-h-screen flex justify-between">
      <Navbar />
      <div className="w-[75%] ml-[25%] homemain h-full p-6 rounded flex flex-col gap-6">
        <main className="flex-1 ">
          <header className="flex flexWithCol justify-between items-center mb-6">
            <div classname="flexWithRow">
              <h2 className="text-2xl bigText  font-semibold capitalize">{`Good ${greet}, ${userName}!`}</h2>
              <p className="text-lg  text-muted-foreground">
                {hours}:{minutes} {hours > 12 ? "pm" : "am"}
              </p>
            </div>
            <div className="flex  items-center">
              <span className="mr-2 weather text-lg">
                {weather?.name}, {weather?.sys?.country ?? "IN"}
              </span>
              <img
                src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
                alt="Weather Icon"
                className="w-8 h-8"
              />
              <span className="ml-2 text-2xl font-bold">
                {weather?.main?.temp ?? "--"}°C
              </span>
            </div>
          </header>
          <section className="mt-6">
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Total Balance</h3>
              <div className="flex justify-between flexWithCol midText mt-4 text-lg">
                <div className="font-medium">Total : ₹{total}</div>
                <div className="font-medium">Expenses: ₹{totalExpense}</div>
                <div className="font-medium">Income: ₹{totalIncome}</div>
                <div className="font-medium">Net Balance : ₹{netBalance}</div>
              </div>
            </div>
          </section>
          <RecentTransaction />
          <UpcomingTransaction/>
        </main>
      </div>
    </div>
  );
};

export default Homepage;
