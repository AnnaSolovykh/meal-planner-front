import { Box, Checkbox, Grid, Typography } from '@mui/material';
import { SavedMealType } from '../utils/types';
import { useState } from 'react';
import { updateMeal } from '../utils/fetchData';

type SavedRecipeProps = {
    meal: SavedMealType,
};

const SavedMeal = ({ meal }: SavedRecipeProps) => {
    const [checked, setChecked] = useState(meal.isFavorite)

    const handleCheckboxChange = async (event: { target: { checked: boolean; }; }) => {
        const newCheckedStatus = event.target.checked;
        setChecked(newCheckedStatus);
        try {
            await updateMeal(meal._id, { ...meal, isFavorite: newCheckedStatus });
        } catch (error) {
            console.error('Error updating meal:', error);
        }
    };

    return (
        <Grid container spacing={6} alignItems='center'>
            <Grid item xs={6}>
                <Typography>{meal.title}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography>{meal.type}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    icon={<span style={{ border: '2px solid #ccc', borderRadius: '3px', width: 24, height: 24 }} />}
                    checkedIcon={<span style={{ backgroundColor: '#f50057', borderRadius: '3px', width: 24, height: 24 }} />}
                />
            </Grid>
        </Grid>
    )
};

export default SavedMeal;