import { Typography, Box, Button } from '@mui/material';
import { RecipeType, SavedMealType } from '../../utils/types';
import { useAuth } from '../AuthProvider';
import { useState } from 'react';
import { LoginModal } from './LoginModal';
import { createMeal } from '../../utils/fetchData';
import { Link, useNavigate } from 'react-router-dom';

type FetchedMealType = {
  recipe: RecipeType;
};

const FetchedMeal = ({ recipe }: FetchedMealType) => {
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleSave = (meal: SavedMealType) => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      saveRecipe(meal);
    }
  };

  const saveRecipe = async (meal: SavedMealType) => {
    createMeal(meal)
      .then(() => {
        navigate('/meals');
      })
      .catch((error) => {
        const messages = error.response?.data?.msg
          .split(',')
          .map((msg: string) => msg.trim() + '.');
        setErrorMessage(messages || ['An unexpected error occurred.']);
      });
  };

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

  const calories = Math.floor((recipe.calories / recipe.totalWeight) * 100);

  const meal: SavedMealType = {
    title: recipe.label,
    type: filterMealType(recipe.mealType),
    link: recipe.shareAs,
    ingredients: recipe.ingredientLines,
    calories: calories,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        marginBottom: '50px',
        alignItems: 'center',
        width: '60%',
        marginX: 'auto',
      }}
    >
      <Box sx={{ flex: 1, padding: '10px' }}>
        <Typography variant="h5">{recipe.label}</Typography>
        <Typography variant="subtitle1">
          {filterMealType(recipe.mealType)}
        </Typography>
        <Typography variant="body1">{calories} kkal per 100 grams</Typography>
        <Link to={recipe.shareAs}>Recipe details</Link>
        <Typography variant="body1">Ingredients:</Typography>
        <ul>
          {recipe.ingredientLines.map((ingredient, id) => (
            <li key={id}>
              <Typography component="span">{ingredient}</Typography>
            </li>
          ))}
        </ul>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSave(meal)}
          sx={{ marginTop: '10px', letterSpacing: '1px' }}
        >
          Save Recipe
        </Button>
        {errorMessage && (
          <Typography
            variant="body2"
            style={{ color: 'darkred', marginBottom: '10px' }}
          >
            {errorMessage}
          </Typography>
        )}
        <LoginModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
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
