import { Box, Checkbox, Typography } from "@mui/material";
import { SavedMealType } from "../utils/types";
import { useState } from "react";
import { updateMeal } from "../utils/fetchData";

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
        <Box>
            <Typography>{meal.title}</Typography>
            <Typography>{meal.type}</Typography>
            <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                icon={<span style={{ border: '2px solid #ccc', borderRadius: '3px', width: 24, height: 24 }} />}
                checkedIcon={<span style={{ backgroundColor: '#f50057', borderRadius: '3px', width: 24, height: 24 }} />}
            />
        </Box>
    )
};

export default SavedMeal;