import { Box } from '@mui/material';
import { SavedMealType } from '../../utils/types';
import SavedMeal from './SavedMeal';

type SavedMealsProps = {
    meals: Array<SavedMealType>,
    onDeleteMeal: (mealId?: string) => void;
    onUpdateMeal: (mealId: string, updatedMeal: SavedMealType) => void;
};

const SavedMealsList = ({ meals, onDeleteMeal, onUpdateMeal }: SavedMealsProps) => {
    return (
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            style={{ marginTop:'20px' }}
        >
            <Box sx={{ width: 500, maxWidth: '100%' }}> 
                {meals.map(meal => (
                    <SavedMeal  
                        key={meal._id} 
                        meal={meal} 
                        onDeleteMeal={onDeleteMeal} 
                        onUpdateMeal={onUpdateMeal}
                    />
                ))}
            </Box>
        </Box>
    )
};

export default SavedMealsList;