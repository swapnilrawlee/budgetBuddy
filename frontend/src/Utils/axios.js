import axios from 'axios';

 const axiosInstance  = axios.create({
    // baseURL: 'https://budgetbuddy-rctg.onrender.com', 
    baseURL: 'http://localhost:3000',  // For local development
 
});

export default axiosInstance;
