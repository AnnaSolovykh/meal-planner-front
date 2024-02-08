import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Button, TextField } from "@mui/material";
import { ApiResponse, RecipeType } from "../../utils/types";
import FetchedMeal from "./FetchedMeal";

const FetchRecipes = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(() => 
        sessionStorage.getItem('searchTerm') || 'salmon'
    );

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
            const fetchedRecipes = data.hits.map(hit => hit.recipe);
            setRecipes(fetchedRecipes);
            setLoading(false);
            sessionStorage.setItem('searchTerm', searchTerm);
        } catch (error) {
            console.error("Error fetching recipes:", error);
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
        sx={{ pt: '64px', width: "100vw", height: "auto", minHeight: "100vh", boxSizing: 'border-box' }}
        >                   
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex'}}>
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
            <CircularProgress />
        ) : (
            <>
            <Typography variant="h3" component="h3" sx={{ mb: 4 }}>
                Recipes
            </Typography>
            {recipes.map((recipe, index) => (
                <FetchedMeal key={index} recipe={recipe} />
            ))}
            </>
        )}
        </Box>
    );
};

export default FetchRecipes;
