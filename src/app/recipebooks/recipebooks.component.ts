import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RecipeBook } from '../_models/RecipeBook';
import { RecipebookService } from '../_services/recipebook/recipebook.service';

import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../_services/category/category.service';

@Component({
  selector: 'app-recipebooks',
  templateUrl: './recipebooks.component.html',
  styleUrls: ['./recipebooks.component.scss']
})
export class RecipebooksComponent {
  books?: Observable<RecipeBook[]>;
  faCartPlus = faCartPlus;

  constructor(private bookService : RecipebookService, 
              protected categories : CategoryService) {}

  ngOnInit() {
    this.books = this.bookService.getBooks();
  }
}
