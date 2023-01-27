import { RecipeBook } from "./RecipeBook";
import { Ingredient } from "./Ingredient";

export interface Recipe {
    slug: string;
    title: string;
    page: number | null;
    serves: number | null;
    ingredients: Ingredient[];
    description: string;
    source: RecipeBook | null;
    book_section: number | null;
    estimated_total_price: number | null;
}