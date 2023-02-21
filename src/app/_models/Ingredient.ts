export interface Ingredient {
    slug: string;
    name: string;
    description: string | null;
    average_price: number | null;
    source: number | null;
}

export interface RecipeIngredient {
    ingredient: Ingredient;
    amount: string;
    amount_unit: string;
    preparation: string;
    completed: boolean | null;
}