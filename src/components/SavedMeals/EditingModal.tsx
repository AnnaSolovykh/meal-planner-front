import {
  Modal,
  Paper,
  TextField,
  Button,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { SavedMealType } from '../../utils/types';

type EditingModalProps = {
  meal: SavedMealType;
  isModalOpen: boolean;
  onModalClose: () => void;
  onUpdateMeal: (mealId: string, updatedMeal: SavedMealType) => void;
};

const EditingModal = ({
  meal,
  isModalOpen,
  onModalClose,
  onUpdateMeal,
}: EditingModalProps) => {
  const [editedMeal, setEditedMeal] = useState({
    title: '',
    type: '',
    link: '',
    ingredients: meal.ingredients || [],
    calories: 0,
    ingredientInput: '',
  });
  useEffect(() => {
    if (isModalOpen) {
      setEditedMeal({
        title: meal.title || '',
        type: meal.type || '',
        link: meal.link || '',
        ingredients: meal.ingredients || [],
        calories: meal.calories || 0,
        ingredientInput: '',
      });
    }
  }, [isModalOpen, meal]);

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setEditedMeal({
      ...editedMeal,
      [name]: value,
    });
  };

  const handleIngredientKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && editedMeal.ingredientInput.trim()) {
      e.preventDefault();
      setEditedMeal({
        ...editedMeal,
        ingredients: [
          ...editedMeal.ingredients,
          editedMeal.ingredientInput.trim(),
        ],
        ingredientInput: '',
      });
    }
  };

  const removeIngredient = (ingredient: string) => {
    setEditedMeal({
      ...editedMeal,
      ingredients: editedMeal.ingredients.filter((item) => item !== ingredient),
    });
  };

  const handleSave = () => {
    if (meal._id) {
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ingredientInput, ...mealToUpdate } = editedMeal;
      onUpdateMeal(meal._id, mealToUpdate as SavedMealType);
      onModalClose();
    }
  };
  return (
    <Modal
      open={isModalOpen}
      onClose={onModalClose}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" id="edit-modal-title" sx={{ mb: 2 }}>
          Edit Meal
        </Typography>
        <TextField
          label="title"
          name="title"
          value={editedMeal.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>type</InputLabel>
          <Select
            label="type"
            name="type"
            value={editedMeal.type}
            onChange={handleInputChange}
          >
            <MenuItem value="breakfast">Breakfast</MenuItem>
            <MenuItem value="lunch">Lunch</MenuItem>
            <MenuItem value="dinner">Dinner</MenuItem>
            <MenuItem value="snack">Snack</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="link to the recipe"
            name="link"
            value={editedMeal.link}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="ingredients"
            name="ingredientInput"
            value={editedMeal.ingredientInput}
            onChange={handleInputChange}
            onKeyPress={handleIngredientKeyPress}
            helperText="Press enter to add an ingredient"
          />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '10px',
            }}
          >
            {editedMeal.ingredients.map((ingredient, index) => (
              <Chip
                key={index}
                label={ingredient}
                onDelete={() => removeIngredient(ingredient)}
              />
            ))}
          </div>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Calories in 100 gram"
            name="calories"
            value={editedMeal.calories || ''}
            onChange={handleInputChange}
            type="number"
          />
        </FormControl>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <IconButton
          aria-label="close"
          onClick={onModalClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'grey' }}
        >
          <Close />
        </IconButton>
      </Paper>
    </Modal>
  );
};

export default EditingModal;
