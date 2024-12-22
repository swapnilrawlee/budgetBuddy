import axios from 'axios';

 const axiosInstance  = axios.create({
    baseURL: 'https://budgetbuddy-21kb.onrender.com/', 
});

export default axiosInstance;
