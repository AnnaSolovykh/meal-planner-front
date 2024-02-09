import { useEffect, useState } from 'react'
import { Box, Pagination, Typography } from '@mui/material';
import { FilterValuesType, MealsType, SavedMealType } from '../../utils/types';
import { createMeal, deleteMeal, getMeals, updateMeal } from '../../utils/fetchData';
import SavedMealsList from './SavedMealsList';
import AddMealForm from './AddMealForm';
import MealFilter from './MealFilter';

import { useAuth } from '../AuthProvider';

const MealsManager = () => {
  const { isAuthenticated } = useAuth(); 
  const [mealsData, setMealsData] = useState<MealsType>({ 
    totalPages: 0, 
    currentPage: 1, 
    meals: [] 
  });

  const limit = 5;

  const initialFilters = {
    typeFilter: '',
    titleFilter: '',
    isFavoriteFilter: undefined, 
  };
  const [filters, setFilters] = useState(initialFilters);

  useEffect(()=> {

    if (isAuthenticated) {
    getMeals(filters.typeFilter, filters.titleFilter, filters.isFavoriteFilter, mealsData.currentPage, limit)
      .then(response => {
        console.log(response)
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
    }, [mealsData.currentPage, filters, isAuthenticated, filters]);

  const handleCreateMeal = (meal: SavedMealType) => {
    console.log(meal)
    createMeal(meal)
      .then(response => {
        console.log(response)
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
      typeFilter: filterValues.typeFilter || '',
      titleFilter: filterValues.titleFilter || '',
      isFavoriteFilter: filterValues.isFavoriteFilter
    });
    setMealsData({ ...mealsData, currentPage: 1 }); 
  };

  const handleResetFilters = () => {
    console.log('Resetting filters to initial values:', initialFilters);
    setFilters({...initialFilters}); 
    getMeals(initialFilters.typeFilter, initialFilters.titleFilter, initialFilters.isFavoriteFilter, 1, limit)
        .then(response => {
            console.log('Data after reset:', response);
            setMealsData({
                meals: response.meals,
                totalPages: response.totalPages,
                currentPage: 1,
            });
        })
        .catch(error => console.log(error));
};

  
  
  return (
      <Box 
        display='flex' 
        flexDirection='column' 
        alignItems='center' 
        sx={{ 
          width: '100vw', 
          minHeight: '100vh', 
          flexGrow: 1, 
        }}
      >      
      <MealFilter onFilterSubmit={handleFilterSubmit} onResetFilters={handleResetFilters}/> 
      <Typography variant='h3' component='h3' style={ {letterSpacing: '2px'} }>
        My Meals Options
      </Typography>
      <AddMealForm onCreateMeal={handleCreateMeal}/>
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