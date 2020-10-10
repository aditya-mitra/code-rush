const axios = require("axios");

const instance = axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
        'Authorization': process.env.BACKEND_AUTH_TOKEN,
    },
});

export default instance;