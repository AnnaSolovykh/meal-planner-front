import { Box } from '@mui/material';
import { SavedMealType } from '../../utils/types';
import SavedMeal from './SavedMeal';

type SavedMealsProps = {
    meals: Array<SavedMealType>,
    handleDeleteMeal: Function,
    handleUpdateMeal: Function
};

const SavedMealsList = ({ meals, handleDeleteMeal, handleUpdateMeal }: SavedMealsProps) => {
    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <Box sx={{ width: 500, maxWidth: '100%' }}> 
                {meals.map(meal => (
                    <SavedMeal key={meal._id} meal={meal} handleDeleteMeal={handleDeleteMeal} handleUpdateMeal={handleUpdateMeal}/>
                ))}
            </Box>
        </Box>
    )
};

export default SavedMealsList;