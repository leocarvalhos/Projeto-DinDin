import axios from 'axios';
export default axios.create({
    baseURL: 'https://dindin.onrender.com',
    timeout: 120000,
    headers: { 'Content-Type': 'application/json' },
});