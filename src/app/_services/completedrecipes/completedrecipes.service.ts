import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/_models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class CompletedrecipesService {

  constructor() { }

  loadSelectedRecipe(slug : string) {
    let recipe = localStorage.getItem(slug);
    if(recipe) {
      return JSON.parse(recipe);
    }
    return recipe;
  }

  clear() {
    localStorage.clear();
  }

  storeSelectdRecipe(recipe: Recipe) {
    try {
      localStorage.setItem(recipe.slug, JSON.stringify(recipe));
    } catch(error : any) {
      localStorage.clear();
      localStorage.setItem(recipe.slug, JSON.stringify(recipe));
    }
  }
}
