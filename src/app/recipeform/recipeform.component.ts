import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../_models/Recipe';

import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.scss']
})
export class RecipeformComponent {
  form! : FormGroup;
  loading: boolean = false;
  faXMarkSquare = faXmarkSquare;

  @Input() formAction = (form: FormGroup) => {};
  @Input() backRoute = "/recipes";
  @Input() title = "Create Recipe";
  @Input() action = "Create";
  @Input() selected : Recipe | null = null;
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', []],
    });
  }

  addIngredient() {
    this.form.addControl('', {});
  }

  pluralize(value: string) {
    let toreturn = `${value[0].toUpperCase()}${value.slice(1)}`;
    if(toreturn != 'Whole' && toreturn[toreturn.length - 1] != 's') {
      return toreturn + 's';
    }
    return toreturn;
  }
}
