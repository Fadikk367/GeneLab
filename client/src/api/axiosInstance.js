import axios from 'axios';

const baseURL = 'http://localhost:8000/api';

const instance = axios.create({ baseURL });

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('authToken');
  config.headers.Authorization = token;

  return config;
});


export default instance;