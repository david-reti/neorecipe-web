import { Component } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { Recipe } from '../_models/Recipe';
import { RecipeService } from '../_services/recipe/recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  recipes: Recipe[] | null = null;
  selectedRecipe: Recipe | null = null;

  constructor(protected recipeService : RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecommendedRecipes().subscribe(recipes => {
      this.recipes = recipes;
      if(this.recipes && this.recipes.length > 0) {
        this.selectedRecipe = this.recipes[0];
      }
    });
  }
}
