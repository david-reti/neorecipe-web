import { Ingredient } from "./Ingredient";

export interface RecipeIngredient {
    ingredient: RecipeIngredient;
    amount: number;
    amount_unit: string;
    preparation: string;
}