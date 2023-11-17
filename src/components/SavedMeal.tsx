import { SavedMealType } from "../utils/types";

type SavedRecipeProps = {
    meal: SavedMealType;
};

const SavedMeal = ({ meal }: SavedRecipeProps) => {
    return (
        <div>
            <h3>{meal.title}</h3>
        </div>
    )
};

export default SavedMeal;