import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SavedMealType } from '../utils/types';

type AddMealFormProps = {
    handleCreateMeal: (meal: SavedMealType) => void;
};


const AddMealForm = ({ handleCreateMeal }: AddMealFormProps ) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');

    const createTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
    };

    const createType = (event: SelectChangeEvent<string>)  => {
        const newType = event.target.value;
        setType(newType);
    };

    const addMeal= (event: FormEvent<HTMLFormElement>)  => {
        event.preventDefault();
        const newMeal = { title, type };
        handleCreateMeal(newMeal);
        setTitle('');
        setType('');
    };

    return (
        <form onSubmit={addMeal}>
            <FormControl fullWidth margin='normal'>
                <TextField
                    label='Title'
                    variant='outlined'
                    value={title}
                    onChange={createTitle}
                />
            </FormControl>
            <FormControl fullWidth margin='normal'>
                <InputLabel>Type</InputLabel>
                <Select
                    value={type}
                    label='type'
                    onChange={createType}
                >
                    <MenuItem value=''>Select a meal type</MenuItem>
                    <MenuItem value='breakfast'>Breakfast</MenuItem>
                    <MenuItem value='lunch'>Lunch</MenuItem>
                    <MenuItem value='dinner'>Dinner</MenuItem>
                    <MenuItem value='snack'>Snack</MenuItem>
                </Select>
            </FormControl>
            <Button 
                type='submit' 
                variant='contained' 
                color='primary' 
                sx={{ margin: 'normal' }} 
            >
                Add Meal
            </Button>
        </form>
    )
};

export default AddMealForm;