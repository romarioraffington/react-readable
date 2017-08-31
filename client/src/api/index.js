import axios from 'axios';

const {
  SERVER_PROTOCOL,
  SERVER_HOST,
  SERVER_PORT,
  SERVER_API_TIMEOUT,
} = process.env;

const getToken = () => (
  localStorage.token = localStorage.token ? 
                       localStorage.token :
                       Math.random().toString(36).substr(-8)
)

export default axios.create({
  baseURL: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`,
  timeout: SERVER_API_TIMEOUT,
  headers: {
    'Accept': 'application/json',
    'Authorization': getToken(),
  }
});

