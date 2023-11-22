import { useEffect, useState } from 'react'
import { createMeal, getMeals } from '../utils/fetchData';
import SavedMealsList from './SavedMealsList';
import AddMealForm from './AddMealForm';
import { SavedMealType } from '../utils/types';
import { Box, Typography } from '@mui/material';

const App = () => {
  const [meals, setMeals] = useState<SavedMealType[]>([]);

  useEffect(()=> {
    getMeals()
      .then(response => {
        setMeals(response.data.meals);
      })
      .catch(error => {
        console.log(error)
      })
  },[])

  const handleCreateMeal = (meal: SavedMealType) => {
    createMeal(meal)
      .then (response => {
        const meal = response.data.meal;
        const newMeal = {
          _id: meal._id,
          isFavorite: meal.isFavorite,
          title: meal.title,
          type: meal.type,
          createdAt: meal.createdAt
        }
        setMeals([...meals, newMeal]);
      })
      .catch( error => {
        console.log(error);
      })
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{ width: '100vw', height: '100vh' }}>
      <Typography variant='h3' component='h3'>
        My Meals Options
      </Typography>
      <AddMealForm handleCreateMeal={handleCreateMeal}/>
      <SavedMealsList meals={meals}/>
    </Box>
  )
}

export default App;
