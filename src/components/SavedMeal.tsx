import { Box, Typography } from "@mui/material";
import { SavedMealType } from "../utils/types";

type SavedRecipeProps = {
    meal: SavedMealType;
};

const SavedMeal = ({ meal }: SavedRecipeProps) => {
    return (
        <Box>
            <Typography>{meal.title}</Typography>
        </Box>
    )
};

export default SavedMeal;