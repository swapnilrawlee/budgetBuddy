import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Registerpage from "../auth/Registerpage";
import Loginpage from "../auth/Loginpage";
import Homepage from "../pages/Homepage";
import Transactionspage from './components/Transactions.jsx';
import Budgetpage from './components/Budget.jsx';
import Goalspage from './components/Goals.jsx';
import Reportspage from './components/Reports.jsx';
import Settingspage from './components/Settings.jsx';
import Helppage from './components/Help.jsx';
import Userprofile from "./components/Userprofile.jsx";
import { UserContext } from "./userContext.js";

const Routing = () => {
  const [userdata ,setUserdata] =useState()
  return (
    <UserContext.Provider value={{userdata ,setUserdata}}>

    <Routes>
      <Route path="/register" element={<Registerpage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/home" element={<Homepage/>} />
      <Route path="/transactions" element={<Transactionspage/>} />
      <Route path="/budget" element={<Budgetpage/>} />
      <Route path="/goals" element={<Goalspage/>} />
      <Route path="/reports" element={<Reportspage/>} />
      <Route path="/settings" element={<Settingspage/>} />
      <Route path="/help" element={<Helppage/>} />
      <Route path="/userprofile" element={<Userprofile/>} />
    </Routes>
    </UserContext.Provider>
  );
};

export default Routing;
