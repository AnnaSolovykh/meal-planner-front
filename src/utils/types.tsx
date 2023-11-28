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
    _id?: string 
};

export type FilterValuesType = {
    type: string | undefined,
    title: string| undefined,
    isFavorite: boolean,
};