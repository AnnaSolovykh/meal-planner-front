import { ChangeEvent, useState } from 'react';
import { Checkbox, Grid, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditingModal from './EditingModal';
import { SavedMealType } from '../../utils/types';
import { updateMeal } from '../../utils/fetchData';
import MealDetailsModal from './MealDetailsModal';

type SavedRecipeProps = {
    meal: SavedMealType,
    handleDeleteMeal: Function,
    handleUpdateMeal: Function
};

const SavedMeal = ({ meal, handleDeleteMeal, handleUpdateMeal }: SavedRecipeProps) => {
    const [checked, setChecked] = useState(meal.isFavorite);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);


    const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>)  => {
        const newCheckedStatus = event.target.checked;
        setChecked(newCheckedStatus);
        try {
            await updateMeal(meal._id ?? '', { ...meal, isFavorite: newCheckedStatus });
        } catch (error) {
            console.error('Error updating meal:', error);
        }
    };

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleDetailsClick = () => {
        setIsDetailsModalOpen(true);
    };

    const handleDetailsClose = () => {
        setIsDetailsModalOpen(false);
    };
    


    return (
        <Grid container spacing={5} alignItems='center'>
            <Grid item xs={6}>
                <Typography>{meal.title}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>{meal.type}</Typography>
            </Grid>
            <Grid item xs={1}>
            <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    icon={<FavoriteBorderIcon />} 
                    checkedIcon={<FavoriteIcon />} 
                    sx={{
                        width: 46, 
                        height: 46,
                    }}
                />
            </Grid>
            <Grid item xs={1}>
                <MealDetailsModal 
                    meal={meal}
                    onDetailsClick={handleDetailsClick}
                    onDetailesClose={handleDetailsClose}
                    isDetailsModalOpen={isDetailsModalOpen}

                />
            </Grid>
            <Grid item xs={1}>
                <IconButton 
                    onClick={handleEditClick}
                    aria-label='edit' 
                    color="primary" 
                    sx={{
                        width: 46, 
                        height: 46
                    }}
                >
                    <EditIcon sx={{ width: 31, height: 31 }} />
                </IconButton>
            </Grid>
            <Grid item xs={1}>
                <IconButton 
                    onClick={ ()=> handleDeleteMeal(meal._id) } 
                    aria-label='delete'
                    color="primary"
                    sx={{
                        width: 46, 
                        height: 46,
                    }}
                >
                    <DeleteOutlineIcon sx={{ width: 31, height: 31 }} />
                </IconButton>
            </Grid>
            <EditingModal 
                meal={meal} 
                isModalOpen={isModalOpen} 
                onModalClose={handleModalClose} 
                onUpdateMeal={handleUpdateMeal}
            />
        </Grid>
    )
};

export default SavedMeal;