import { useEffect, useState } from 'react'
import { Box, Pagination, Typography } from '@mui/material';
import { FilterValuesType, MealsType, SavedMealType } from '../../utils/types';
import { createMeal, deleteMeal, getMeals, updateMeal } from '../../utils/fetchData';
import SavedMealsList from './SavedMealsList';
import AddMealForm from './AddMealForm';
import MealFilter from './MealFilter';

import { useAuth } from '../../utils/AuthProvider';

const MealsManager = () => {
  const { isAuthenticated } = useAuth(); 
  const [mealsData, setMealsData] = useState<MealsType>({ 
    totalPages: 0, 
    currentPage: 1, 
    meals: [] 
  });
  const limit = 5;
  const [filters, setFilters] = useState({
    typeFilter: '',
    titleFilter: '',
    isFavoriteFilter: false 
  });

  useEffect(()=> {
    if (isAuthenticated) {
    getMeals(filters.typeFilter, filters.titleFilter, filters.isFavoriteFilter, mealsData.currentPage, limit)
      .then(response => {
        setMealsData({
          ...mealsData,
          meals: response.meals,
          totalPages: response.totalPages,
          currentPage: response.currentPage
        });
      })
      .catch(error => {
        console.log(error)
      })
    }
    }, [mealsData.currentPage, filters,isAuthenticated]);

  const handleCreateMeal = (meal: SavedMealType) => {
    createMeal(meal)
      .then(response => {
        const newMeal = response.data.meal;
        setMealsData({
          ...mealsData,
          meals: [...mealsData.meals, newMeal]
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteMeal = (mealId: string) => {
    deleteMeal(mealId)
      .then(() => {
        setMealsData(prevMealsData => ({
          ...prevMealsData,
          meals: prevMealsData.meals.filter(item => item._id !== mealId)
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdateMeal = (mealId: string, updatedMeal: SavedMealType) => {
    updateMeal(mealId, updatedMeal)
      .then((response) => {
        const updatedMealIndex = mealsData.meals.findIndex(
          (meal) => meal._id === mealId
        );
        const updatedMeals = [...mealsData.meals];
        updatedMeals[updatedMealIndex] = response.data.meal;
        setMealsData({
          ...mealsData,
          meals: updatedMeals,
        });
      })
      .catch((error) => {
        console.error('Error updating meal:', error);
      });
  };
  
  
  const handlePageChange = (_: unknown, value: number) => {
    setMealsData({ ...mealsData, currentPage: value });
  };

  const handleFilterSubmit = (filterValues: FilterValuesType)=> {
    setFilters({
      typeFilter: filterValues.type || '',
      titleFilter: filterValues.title || '',
      isFavoriteFilter: filterValues.isFavorite
    });
    setMealsData({ ...mealsData, currentPage: 1 }); 
  };
  
  
  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{ width: '100vw', height: '100vh' }}>
      <MealFilter onFilterSubmit={handleFilterSubmit}/> 
      <Typography variant='h3' component='h3'>
        My Meals Options
      </Typography>
      <AddMealForm handleCreateMeal={handleCreateMeal}/>
      <SavedMealsList meals={mealsData.meals} handleDeleteMeal={handleDeleteMeal} handleUpdateMeal={handleUpdateMeal}/>
      <Pagination 
        count={mealsData.totalPages} 
        page={mealsData.currentPage} 
        onChange={handlePageChange} 
      />
    </Box>
  )
}

export default MealsManager;