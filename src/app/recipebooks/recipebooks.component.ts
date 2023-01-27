import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RecipeBook } from '../_models/RecipeBook';
import { RecipebookService } from '../_services/recipebook/recipebook.service';

@Component({
  selector: 'app-recipebooks',
  templateUrl: './recipebooks.component.html',
  styleUrls: ['./recipebooks.component.scss']
})
export class RecipebooksComponent {
  books?: Observable<RecipeBook[]>;

  constructor(private bookService : RecipebookService) {}

  ngOnInit() {
    this.books = this.bookService.getBooks();
  }
}