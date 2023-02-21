import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipe, RecipeStep } from '../_models/Recipe';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { RecipeIngredient } from '../_models/Ingredient';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.scss']
})
export class RecipeformComponent {
  form! : FormGroup;
  loading: boolean = false;
  faXMark = faXmark;

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

    if(!this.selected) {
      this.selected = {
        slug: '',
        page: 0,
        title: '',
        description: '',
        serves: 0,
        estimated_total_price: 0,
        steps: [],
        ingredients: [],
        preparation_time: '',
        source: null,
        book_section: null
      }
    }
  }

  pluralize(value: string) {
    if(value == 'Select Unit') return value;
    let toreturn = `${value[0].toUpperCase()}${value.slice(1)}`;
    if(toreturn != 'Whole' && toreturn[toreturn.length - 1] != 's') {
      return toreturn + 's';
    }
    return toreturn;
  }

  addStep() {
    this.selected?.steps.push({
      step_number: this.selected?.steps.length,
      description: '',
      completed: false
    });
  }

  removeStep(step: RecipeStep) {
    if(this.selected) {
      this.selected.steps.splice(this.selected.steps.indexOf(step), 1);
    }
  }

  addIngredient() {
    this.selected?.ingredients.push({
        ingredient: {
          slug: '',
          name: '',
          description: '',
          average_price: 0,
          source: 0
        },
        amount: '',
        amount_unit: 'Select Unit',
        preparation: '',
        completed: false
    });
  }

  removeIngredient(ingredient: RecipeIngredient) {
    if(this.selected) {
      this.selected.ingredients.splice(this.selected.ingredients.indexOf(ingredient), 1);
    }
  }
}
