import { useEffect, useState } from 'react'
import { createMeal, getMeals } from '../utils/fetchData';
import SavedMealsList from './SavedMealsList';
import AddMealForm from './AddMealForm';
import { MealsType, SavedMealType } from '../utils/types';
import { Box, Pagination, Typography } from '@mui/material';

const App = () => {
  const [mealData, setMealData] = useState<MealsType>({ 
    totalPages: 0, 
    currentPage: 1, 
    meals: [] 
  });
  const limit = 5;

  useEffect(()=> {
    getMeals(mealData.currentPage, limit)
      .then(response => {
        setMealData({
          ...mealData,
          meals: response.meals,
          totalPages: response.totalPages,
          currentPage: response.currentPage
        });
      })
      .catch(error => {
        console.log(error)
      })
    }, [mealData.currentPage]);

  const handleCreateMeal = (meal: SavedMealType) => {
    createMeal(meal)
      .then(response => {
        const newMeal = response.data.meal;
        setMealData({
          ...mealData,
          meals: [...mealData.meals, newMeal]
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const handlePageChange = (_: unknown, value: number) => {
    setMealData({ ...mealData, currentPage: value });
  };
  
  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{ width: '100vw', height: '100vh' }}>
      <Typography variant='h3' component='h3'>
        My Meals Options
      </Typography>
      <AddMealForm handleCreateMeal={handleCreateMeal}/>
      <SavedMealsList meals={mealData.meals}/>
      <Pagination 
        count={mealData.totalPages} 
        page={mealData.currentPage} 
        onChange={handlePageChange} 
      />
    </Box>
  )
}

export default App;
