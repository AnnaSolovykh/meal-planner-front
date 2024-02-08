import { Typography, Box, Button } from "@mui/material";
import { RecipeType, SavedMealType } from "../../utils/types";
import { useAuth } from "../../utils/AuthProvider";
import { useState } from "react";
import { LoginModal } from "./LoginModal";
import { createMeal } from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";

type FetchedMealType = {
    recipe: RecipeType;
};

const FetchedMeal = ({ recipe }: FetchedMealType) => {
    const { isAuthenticated } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSave =  (meal: SavedMealType) => {
        if (!isAuthenticated) {
            setIsModalOpen(true);
        } else {
            saveRecipe(meal);
        }
    };

    const saveRecipe = async (meal: SavedMealType)  => {
        createMeal(meal)
        .then(response => {
            navigate('/meals');
            })
            .catch(error => {
            console.log(error);
        });
    }

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

    const meal = {
        title: recipe.label,
        type: filterMealType(recipe.mealType)
    }

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
                <Button variant="contained" color="primary" onClick={()=> handleSave(meal)} sx={{ marginTop: '10px' }}>
                    Save Recipe
                </Button>
                <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
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
