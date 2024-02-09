export type MealsType = {
    totalPages: number,
    currentPage: number,
    meals: SavedMealType[]
};

export type SavedMealType = {
    createdAt?: string,
    isFavorite?: boolean,
    title: string,
    type: string,
    link: string,
    ingredients?: string[],
    calories?: number,
    _id?: string 
};

export type FilterValuesType = {
    typeFilter: string,
    titleFilter: string,
    isFavoriteFilter?: any; 
};

export type RecipeType = {
    label: string;
    mealType: string[],
    ingredientLines: string[],
    image: string;
    shareAs: string,
    calories: number,
    totalWeight: number
};

export type HitType = {
    recipe: RecipeType;
};

export type ApiResponse = {
    hits: HitType[];
};