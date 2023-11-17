import { Box } from "@mui/material";
import { SavedMealType } from "../utils/types";
import SavedMeal from "./SavedMeal";

type SavedMealsProps = {
    meals: Array<SavedMealType>
};

const SavedMealsList = ({ meals }: SavedMealsProps) => {
    return (
        <Box>
            {meals.map(meal => (
                <SavedMeal key={meal._id} meal={meal}/>
            ))}
        </Box>
    )
};

export default SavedMealsList;