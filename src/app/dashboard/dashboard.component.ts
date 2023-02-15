import { Component } from '@angular/core';
import { Recipe, RecipeStep } from '../_models/Recipe';
import { RecipeService } from '../_services/recipe/recipe.service';

import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { RecipeIngredient } from '../_models/Ingredient';
import { CompletedrecipesService } from '../_services/completedrecipes/completedrecipes.service';

const MONTH_NAMES =    ['Jan', 'Feb', 'Mar', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAYS_PER_MONTH = [31,     28,    31,    30,    31,    30,    31,    31,    30,    31,    30,    31];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  recipes: Recipe[] | null = null;
  selectedRecipe: Recipe | null = null;
  faRotate = faRotate;

  constructor(protected recipeService : RecipeService, private completed: CompletedrecipesService) {}

  ngOnInit() {
    this.recipeService.getRecommendedRecipes().subscribe(recipes => {
      this.recipes = [];
      recipes.forEach(recipe => {
        const completedRecipe = this.completed.loadSelectedRecipe(recipe.slug);
        if(completedRecipe) {
          this.recipes?.push(completedRecipe)
        } else {
          this.recipes?.push(recipe);
        }
      });

      if(this.recipes.length > 0) {
        this.selectedRecipe = this.recipes[0];
      }
    });
  }

  getWeek() {
    const date = new Date();
    const leapYearAdjustment = (date.getFullYear() % 4 == 0 && date.getFullYear() % 400 == 0 && date.getFullYear() % 100 != 0 && date.getMonth() == 2) ? 1 : 0;
    let firstDay = (date.getDate() - date.getDay()) % (DAYS_PER_MONTH[date.getMonth() + leapYearAdjustment]);
    const lastDay = (firstDay + 7) % DAYS_PER_MONTH[date.getMonth() + leapYearAdjustment];

    const firstMonth = MONTH_NAMES[date.getMonth() - (date.getDate() - date.getDay() < 0 ? 1 : 0)];
    const secondMonth = MONTH_NAMES[date.getMonth() + (firstDay + 7 > (DAYS_PER_MONTH[date.getMonth()] + leapYearAdjustment) ? 1 : 0)];

    if(firstDay < 0) {
      firstDay += DAYS_PER_MONTH[date.getMonth() - 1];
    }

    return `${firstMonth} ${firstDay} - ${secondMonth} ${lastDay}`
  }

  refreshRecipes() {
    this.recipeService.regenerateRecommendedRecipes();
    this.completed.clear();
  }

  refreshStoredRecipes() {
    this.recipes?.forEach(recipe => {
      this.completed.storeSelectdRecipe(recipe);
    });
  }

  completeIngredient(ingredient: RecipeIngredient) {
    ingredient.completed = !ingredient.completed;
    this.refreshStoredRecipes();
  }

  completeStep(step: RecipeStep) {
    step.completed = !step.completed;
    this.refreshStoredRecipes();
  }
}
