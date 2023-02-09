import { RecipeBook } from "./RecipeBook";
import { RecipeIngredient } from "./Ingredient";

export interface RecipeStep {
    step_number: number;
    description: string;
    completed: boolean | null;
}

export interface Recipe {
    slug: string;
    title: string;
    page: number | null;
    serves: number | null;
    steps: RecipeStep[];
    ingredients: RecipeIngredient[];
    description: string;
    source: RecipeBook | null;
    book_section: number | null;
    preparation_time: string;
    estimated_total_price: number | null;
}