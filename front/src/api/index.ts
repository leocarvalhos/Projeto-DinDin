import axios from 'axios';
export default axios.create({
    baseURL: 'https://back-dindin-3btc.onrender.com',
    timeout: 20000,
    headers: { 'Content-Type': 'application/json' },
});