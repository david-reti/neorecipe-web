import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeletemodalComponent } from '../deletemodal/deletemodal.component';
import { RecipeIngredient } from '../_models/Ingredient';
import { Recipe, RecipeStep } from '../_models/Recipe';
import { CompletedrecipesService } from '../_services/completedrecipes/completedrecipes.service';
import { RecipeService } from '../_services/recipe/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  @Input() recipe: Recipe | null = null;
  @Input() completable: boolean = false;

  @ViewChild(DeletemodalComponent) deleteModal : any = null;

  slug: string = "";

  constructor(private recipes: RecipeService,
              protected route: ActivatedRoute, 
              private completed: CompletedrecipesService) {}

  ngOnInit() {
    this.slug = this.route.snapshot.params['slug'];
    if(this.slug) {
      this.recipes.getSingleRecipe(this.slug).subscribe((recipe : any) => {
        this.recipe = recipe;
        document.title = `Neorecipe | ${this.recipe?.title}`
      })
    }
  }

  refreshStoredRecipes() {
    if(this.recipe) {
      this.completed.storeSelectdRecipe(this.recipe);
    }
  }

  completeIngredient(ingredient: RecipeIngredient) {
    if(this.completable) {
      ingredient.completed = !ingredient.completed;
      this.refreshStoredRecipes();
    }
  }

  completeStep(step: RecipeStep) {
    if(this.completable) {
      step.completed = !step.completed;
      this.refreshStoredRecipes();
    }
  }

  showDelete() {
    this.deleteModal?.openModal();
  }
}
