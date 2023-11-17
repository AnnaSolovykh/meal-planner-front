import axios from 'axios';

export const getMeals = () => {
    return axios.get('http://localhost:4000/api/v1/meals/', {
        headers: {
            "Content-Type": "application/json",
        }
    })
};