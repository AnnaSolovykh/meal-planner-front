import { useEffect, useState } from 'react'
import { getMeals } from '../utils/fetchData';
import SavedMealsList from './SavedMealsList';

const App = () => {
  const [meals, setMeals] = useState([]);

  useEffect(()=> {
    getMeals()
      .then(response => {
        setMeals(response.data.meals);
      })
      .catch(error => {
        console.log(error)
      })
  },[])
  return (
    <>
      <SavedMealsList meals={meals}/>
    </>
  )
}

export default App;
