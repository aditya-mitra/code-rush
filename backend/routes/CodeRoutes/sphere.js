const axios = require("axios");

const instance = axios.create({
  baseURL: process.env.CODE_COMPILER_URL,
  params: {
    access_token: process.env.CODE_COMPILER_ACCESS_TOKEN,
  },
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
});

module.exports = instance;
