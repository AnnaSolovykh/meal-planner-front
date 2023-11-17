import { SavedMealType } from "../utils/types";
import SavedMeal from "./SavedMeal";

type SavedMealsProps = {
    meals: Array<SavedMealType>
};

const SavedMealsList = ({ meals }: SavedMealsProps) => {
    return (
        <div>
            {meals.map(meal => (
                <SavedMeal key={meal._id} meal={meal}/>
            ))}
        </div>
    )
};

export default SavedMealsList;