import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:4000/api/v1', 
    baseURL: 'https://meal-planner-2qb0.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
