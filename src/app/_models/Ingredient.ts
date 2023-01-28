export interface Ingredient {
    slug: string;
    name: string;
    description: string | null;
    average_price: number;
    source: number;
}

export interface RecipeIngredient {
    ingredient: Ingredient;
    amount: string;
    amount_unit: string;
    preparation: string;
}