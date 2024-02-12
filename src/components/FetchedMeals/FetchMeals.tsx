import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  TextField,
} from '@mui/material';
import { ApiResponse, RecipeType } from '../../utils/types';
import FetchedMeal from './FetchedMeal';

const FetchRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    () => sessionStorage.getItem('searchTerm') || 'salmon'
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  const apiKey = import.meta.env.VITE_EDAMAM_API_KEY;
  const appId = import.meta.env.VITE_EDAMAM_APP_ID;

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${encodeURIComponent(searchTerm)}&app_id=${appId}&app_key=${apiKey}`
      );
      const data: ApiResponse = await response.json();
      const fetchedRecipes = data.hits.map((hit) => hit.recipe);
      setRecipes(fetchedRecipes);
      setLoading(false);
      sessionStorage.setItem('searchTerm', searchTerm);
      if (fetchedRecipes.length === 0) {
        setErrorMessage('No recipes found. Try again please.');
      } else {
        setErrorMessage('');
      }
    } catch (error) {
      const message = 'Cannot get recipes. Please try again later.';
      setErrorMessage(message);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchRecipes();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        pt: '64px',
        width: '100vw',
        height: 'auto',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: '20px', display: 'flex' }}
      >
        <TextField
          label="Search for a recipe"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ marginRight: '8px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      {loading ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '20vh',
          }}
        >
          <CircularProgress />
          {errorMessage && (
            <Typography
              variant="body2"
              style={{ color: 'darkred', marginBottom: '10px' }}
            >
              {errorMessage}
            </Typography>
          )}
        </div>
      ) : (
        <>
          <Typography variant="h3" component="h3" sx={{ mb: 4 }}>
            Recipes
          </Typography>
          {errorMessage && (
            <Typography
              variant="body2"
              style={{ color: 'darkred', marginBottom: '10px' }}
            >
              {errorMessage}
            </Typography>
          )}
          {recipes.map((recipe, index) => (
            <FetchedMeal key={index} recipe={recipe} />
          ))}
        </>
      )}
    </Box>
  );
};

export default FetchRecipes;
