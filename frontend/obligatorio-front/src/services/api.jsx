/* eslint-disable no-undef */
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // URL del backend
});

export default api;
