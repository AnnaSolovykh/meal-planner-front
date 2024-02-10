import api from './api';
import { MealsType, SavedMealType } from './types';

export const fetchLogin = (email: string, password: string) => {
  return api.post(
    `http://localhost:4000/api/v1/auth/login`,
    {
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const fetchRegister = (
  name: string,
  email: string,
  password: string
) => {
  return api.post(
    `http://localhost:4000/api/v1/auth/register`,
    {
      name,
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const fetchLogout = () => {
  return api.post('http://localhost:4000/api/v1/auth/logout');
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
    .get(`http://localhost:4000/api/v1/meals?${query}`)
    .then((response) => response.data as MealsType);
};

export const createMeal = (meal: SavedMealType) => {
  return api.post(
    'http://localhost:4000/api/v1/meals/',
    {
      ...meal,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const updateMeal = (mealId: string, meal: SavedMealType) => {
  return api.patch(
    `http://localhost:4000/api/v1/meals/${mealId}`,
    {
      ...meal,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const deleteMeal = (mealId: string) => {
  return api.delete(`http://localhost:4000/api/v1/meals/${mealId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
