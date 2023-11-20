import axios from 'axios';
import { SavedMealType } from './types';

export const getMeals = () => {
    return axios.get('http://localhost:4000/api/v1/meals/', {
        headers: {
            "Content-Type": "application/json",
        }
    })
};

export const updateMeal = (mealId: string, meal: SavedMealType) => {
    return axios.patch(`http://localhost:4000/api/v1/meals/${mealId}`, 
        {
            ...meal
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    )
};