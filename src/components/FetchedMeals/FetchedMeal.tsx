import { Typography, Box } from "@mui/material";
import { RecipeType } from "../../utils/types";

type FetchedMealType = {
    recipe: RecipeType;
};

const FetchedMeal = ({ recipe }: FetchedMealType) => {
    const filterMealType = (mealType: string[]): string => {
        if (mealType.length > 0) {
            const type = mealType[0];
            const standardMealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
        
            if (type.includes('/')) {
                return type.split('/')[1];
            } else if (!standardMealTypes.includes(type.toLowerCase())) {
                return 'snack';
            }
            return type;
        }
        return 'snack';
    };

    return (
        <Box sx={{ display: 'flex', marginBottom: '50px', alignItems: 'center', width: '60%', marginX: 'auto' }}>
            <Box sx={{ flex: 1, padding: '10px' }}>
                <Typography variant="h5">{recipe.label}</Typography>
                <Typography variant="subtitle1">{filterMealType(recipe.mealType)}</Typography>
                <Typography variant="body1">Ingredients:</Typography>
                <ul>
                {recipe.ingredientLines.map((ingredient, id) => (
                    <li key={id}>
                        <Typography component="span">{ingredient}</Typography>
                    </li>
                ))}
                </ul>
            </Box>
            <Box
                component="img"
                src={recipe.image}
                alt={recipe.label}
                sx={{ width: '40%', height: 'auto', objectFit: 'cover' }}
            />
        </Box>
    );
};

export default FetchedMeal;
