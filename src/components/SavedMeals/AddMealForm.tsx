import React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { SavedMealType } from '../../utils/types';

type AddMealFormProps = {
    onCreateMeal: (meal: SavedMealType) => void;
};

const AddMealForm = ({ onCreateMeal }: AddMealFormProps) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [link, setLink] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [calories, setCalories] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [ingredientInput, setIngredientInput] = useState('')

    const createTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const createType = (event: SelectChangeEvent<string>) => {
        setType(event.target.value);
    };

    const createLink = (event: ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    };

    const createCalories = (event: ChangeEvent<HTMLInputElement>) => {
        setCalories(event.target.value.replace(/[^0-9]/g, ''));
    };

    const toggleIsFavorite = (event: ChangeEvent<HTMLInputElement>) => {
        setIsFavorite(event.target.checked);
    };

    const handleIngredientKeyPress = (event: { key: string; preventDefault: () => void; }) => {
        if (event.key === 'Enter' && ingredientInput) {
            event.preventDefault();
            setIngredients([...ingredients, ingredientInput.trim()]);
            setIngredientInput('');
        }
    };

    const removeIngredient = (ingredientToRemove: string) => {
        setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
    };


    const addMeal = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newMeal: SavedMealType = { title, type, link, ingredients, calories: Number(calories), isFavorite };
        onCreateMeal(newMeal);
        setTitle('');
        setType('');
        setLink('');
        setIngredients([]);
        setCalories('');
        setIsFavorite(false);
    };

    return (
        <form 
        onSubmit={addMeal} 
        style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr',
            gap: '20px', 
            maxWidth: '800px', 
            margin: 'auto', 
            marginTop: '0', 
            marginBottom: '0', 
            padding: '0',
        }}
        >
        <div> 
            <FormControl fullWidth margin="normal">
            <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={createTitle}
            />
            </FormControl>
            <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
                value={type}
                label="Type"
                onChange={createType}
            >
                <MenuItem value="">Select a meal type</MenuItem>
                <MenuItem value="breakfast">Breakfast</MenuItem>
                <MenuItem value="lunch">Lunch</MenuItem>
                <MenuItem value="dinner">Dinner</MenuItem>
                <MenuItem value="snack">Snack</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
            <TextField
                label="Link to the recipe"
                variant="outlined"
                value={link}
                onChange={createLink}
            />
            </FormControl>
        </div>

        <div>
            <FormControl fullWidth margin="normal">
            <TextField
                label="Ingredients"
                variant="outlined"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyPress={handleIngredientKeyPress}
                helperText="Press enter to add an ingredient"
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {ingredients.map(ingredient => (
                <Chip
                    key={ingredient}
                    label={ingredient}
                    onDelete={() => removeIngredient(ingredient)}
                />
                ))}
            </div>
            </FormControl>
            <FormControl fullWidth margin="normal">
            <TextField
                label="calories in 100 gram"
                variant="outlined"
                value={calories}
                onChange={createCalories}
                type="number"
            />
            </FormControl>
            <FormControlLabel
                control={<Checkbox checked={isFavorite} onChange={toggleIsFavorite} />}
                label="Favorite"
            />
        </div>

        <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ gridColumn: '1 / -1', margin: 'normal', marginBottom:'20px', letterSpacing: '2px' }} 
        >
            Add Meal
        </Button>
    </form>

    );
};

export default AddMealForm;
