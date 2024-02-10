import { ChangeEvent, useState } from 'react';
import { Checkbox, Grid, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { DeleteOutline } from '@mui/icons-material';
import { Favorite } from '@mui/icons-material';
import { FavoriteBorder } from '@mui/icons-material';
import { SavedMealType } from '../../utils/types';
import { updateMeal } from '../../utils/fetchData';
import EditingModal from './EditingModal';
import MealDetailsModal from './MealDetailsModal';

type SavedRecipeProps = {
  meal: SavedMealType;
  onDeleteMeal: (mealId?: string) => void;
  onUpdateMeal: (mealId: string, updatedMeal: SavedMealType) => void;
};

const SavedMeal = ({ meal, onDeleteMeal, onUpdateMeal }: SavedRecipeProps) => {
  const [checked, setChecked] = useState(meal.isFavorite);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newCheckedStatus = event.target.checked;
    setChecked(newCheckedStatus);
    try {
      await updateMeal(meal._id ?? '', {
        ...meal,
        isFavorite: newCheckedStatus,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response?.data?.msg ||
        'Failed to update the meal. Please try again.';
      setErrorMessage(message);
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
    <Grid container spacing={5} alignItems="center">
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
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
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
          aria-label="edit"
          color="primary"
          sx={{
            width: 46,
            height: 46,
          }}
        >
          <Edit sx={{ width: 31, height: 31 }} />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          onClick={() => onDeleteMeal(meal._id)}
          aria-label="delete"
          color="primary"
          sx={{
            width: 46,
            height: 46,
          }}
        >
          <DeleteOutline sx={{ width: 31, height: 31 }} />
        </IconButton>
      </Grid>
      <EditingModal
        meal={meal}
        isModalOpen={isModalOpen}
        onModalClose={handleModalClose}
        onUpdateMeal={onUpdateMeal}
      />
      {errorMessage && (
        <Typography
          variant="body2"
          style={{ color: 'darkred', marginBottom: '10px' }}
        >
          {errorMessage}
        </Typography>
      )}
    </Grid>
  );
};

export default SavedMeal;
