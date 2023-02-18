import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../_models/Recipe';
import { RecipeService } from '../_services/recipe/recipe.service';

@Component({
  selector: 'app-recipeedit',
  templateUrl: './recipeedit.component.html',
  styleUrls: ['./recipeedit.component.scss']
})
export class RecipeeditComponent {
  slug: string = "";
  title: string = "";
  recipe: Recipe | null = null;

  constructor(private route: ActivatedRoute, private recipes: RecipeService) {}

  ngOnInit() {
    this.slug = this.route.snapshot.params['slug'];
    if(this.slug) {
      this.recipes.getSingleRecipe(this.slug).subscribe((recipe : any) => {
        this.recipe = recipe;
        this.title = `Edit ${this.recipe?.title}`;
        document.title = `Neorecipe | ${this.title}`;
      });
    }
  }
}
