import { ChangeEvent, useState } from 'react';
import { Checkbox, Grid, IconButton, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { SavedMealType } from '../../utils/types';
import { updateMeal } from '../../utils/fetchData';

type SavedRecipeProps = {
    meal: SavedMealType,
    handleDeleteMeal: Function
};

const SavedMeal = ({ meal, handleDeleteMeal }: SavedRecipeProps) => {
    const [checked, setChecked] = useState(meal.isFavorite);

    const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>)  => {
        const newCheckedStatus = event.target.checked;
        setChecked(newCheckedStatus);
        try {
            await updateMeal(meal._id ?? '', { ...meal, isFavorite: newCheckedStatus });
        } catch (error) {
            console.error('Error updating meal:', error);
        }
    };

    return (
        <Grid container spacing={6} alignItems='center'>
            <Grid item xs={6}>
                <Typography>{meal.title}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>{meal.type}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    icon={<span style={{ border: '2px solid #ccc', borderRadius: '3px', width: 24, height: 24 }} />}
                    checkedIcon={<span style={{ backgroundColor: '#f50057', borderRadius: '3px', width: 24, height: 24 }} />}
                />
            </Grid>
            <Grid item xs={1}>
                <IconButton 
                    onClick={ ()=> handleDeleteMeal(meal._id) } 
                    aria-label='delete'
                    sx={{
                        color: '#f50057', 
                        '&:hover': {
                            backgroundColor: 'rgba(255, 23, 68, 0.04)', 
                            color: '#ff1744', 
                        },
                        width: 46, 
                        height: 46
                    }}
                >
                    <DeleteOutlineIcon sx={{ width: 31, height: 31 }} />
                </IconButton>
            </Grid>
        </Grid>
    )
};

export default SavedMeal;