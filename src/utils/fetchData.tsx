import api from './api';
import { MealsType, SavedMealType } from './types';

export const fetchLogin = (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
};

export const fetchRegister = (
  name: string,
  email: string,
  password: string
) => {
    return api.post('/auth/register', { name, email, password });
};

export const fetchLogout = () => {
  return api.post('/auth/logout');
};

export const getMeals = (
  typeFilter: string,
  titleFilter: string,
  isFavoriteFilter: boolean | undefined,
  currentPage: number,
  limit: number
): Promise<MealsType> => {
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

  return api
    .get(`/meals?${query}`)
    .then((response) => response.data as MealsType);
};

export const createMeal = (meal: SavedMealType) => {
  return api.post('/meals/', { ...meal });
};

export const updateMeal = (mealId: string, meal: SavedMealType) => {
  return api.patch(`/meals/${mealId}`, { ...meal });
};

export const deleteMeal = (mealId: string) => {
  return api.delete(`/meals/${mealId}`)
};
