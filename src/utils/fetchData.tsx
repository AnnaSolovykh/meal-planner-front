import axios from 'axios';
import { MealsType, SavedMealType } from './types';

const jwtToken = localStorage.getItem('jwtToken');

export const login = (email: string, password: string) => {
    return axios.post(`http://localhost:4000/api/v1/auth/login`, 
        {
            email: email,
            password: password
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
};

export const register = (name: string, email: string, password: string) => {
    return axios.post(`http://localhost:4000/api/v1/auth/register`, 
        {
            name: name,
            email: email,
            password: password
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
};

export const logout = () => {
    return axios.post('http://localhost:4000/api/v1/auth/logout');
};  


export const getMeals = (typeFilter: string, titleFilter: string, isFavoriteFilter: boolean, currentPage: number, limit: number): Promise<MealsType> => {
    let query = `page=${currentPage}&limit=${limit}`;

    if (typeFilter) {
        query += `&type=${typeFilter}`;
    }
    if (titleFilter) {
        query += `&title=${titleFilter}`;
    }
    if (isFavoriteFilter !== undefined) {
        query += `&isFavorite=${isFavoriteFilter}`;
    }

    return axios.get(`http://localhost:4000/api/v1/meals?${query}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    })
    .then(response => response.data as MealsType);
};


export const createMeal = (meal: SavedMealType) => {
    return axios.post('http://localhost:4000/api/v1/meals/',
    {
        ...meal
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    }
    )
};

export const updateMeal = (mealId: string, meal: SavedMealType) => {
    return axios.patch(`http://localhost:4000/api/v1/meals/${mealId}`, 
        {
            ...meal
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        }
    )
};

export const deleteMeal = (mealId: string) => {
    return axios.delete(`http://localhost:4000/api/v1/meals/${mealId}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        }
    )
};