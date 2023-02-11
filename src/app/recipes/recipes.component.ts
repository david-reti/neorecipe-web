import { Component } from '@angular/core';
import { Recipe } from '../_models/Recipe';
import { RecipeService } from '../_services/recipe/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  searchedRecipes: Recipe[] = [];

  RECIPE_CATEGORIES = [
    'Starters',
    'Mains',
    'Desserts',
    'Other'
  ]

  constructor(protected recipes: RecipeService) {}

  ngOnInit() {
    this.recipes.getResults().subscribe(recipes => {
      this.searchedRecipes = recipes;
    });
  }
}
