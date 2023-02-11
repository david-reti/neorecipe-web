import { Component, Input } from '@angular/core';
import { Recipe } from '../_models/Recipe';

@Component({
  selector: 'app-recipetile',
  templateUrl: './recipetile.component.html',
  styleUrls: ['./recipetile.component.scss']
})
export class RecipetileComponent {
  @Input() recipe!: Recipe;
  @Input() link: string = "";

  preparationTime(time: String) {
    let hours = "";
    const numHours = parseInt(time.slice(0, 2));
    if(numHours > 0) {
      hours = `${numHours} hour${numHours > 1 ? 's' : ''}, `
    }
    return `${hours?hours:''}${time.slice(3, 5)} minutes`;
  }
}
