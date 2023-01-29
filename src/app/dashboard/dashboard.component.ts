import { Component } from '@angular/core';
import { first, Observable, Observer, of } from 'rxjs';
import { Recipe } from '../_models/Recipe';
import { RecipeService } from '../_services/recipe/recipe.service';

import { faRotate } from '@fortawesome/free-solid-svg-icons';

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

  constructor(protected recipeService : RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecommendedRecipes().subscribe(recipes => {
      this.recipes = recipes;
      if(this.recipes && this.recipes.length > 0) {
        this.selectedRecipe = this.recipes[0];
      }
    });
  }

  getWeek() {
    const date = new Date();
    const leapYearAdjustment = (date.getFullYear() % 4 == 0 && date.getFullYear() % 400 == 0 && date.getFullYear() % 100 != 0 && date.getMonth() == 2) ? 1 : 0;
    const firstDay = (date.getDate() - date.getDay()) % (DAYS_PER_MONTH[date.getMonth() + leapYearAdjustment]);
    const lastDay = (firstDay + 7) % DAYS_PER_MONTH[date.getMonth() + leapYearAdjustment];

    const firstMonth = MONTH_NAMES[date.getMonth() - (date.getDate() - date.getDay() < 0 ? 1 : 0)];
    const secondMonth = MONTH_NAMES[date.getMonth() + (firstDay + 7 > (DAYS_PER_MONTH[date.getMonth()] + leapYearAdjustment) ? 1 : 0)];
    return `${firstMonth} ${firstDay} - ${secondMonth} ${lastDay}`
  }

  refreshRecipes() {
    this.recipeService.regenerateRecommendedRecipes();
  }
}
