import axios from 'axios';

 const axiosInstance  = axios.create({
    baseURL: 'https://budgetbuddy-rctg.onrender.com', 
});

export default axiosInstance;
