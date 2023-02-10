import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RecipeBook } from '../_models/RecipeBook';
import { RecipebookService } from '../_services/recipebook/recipebook.service';

import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../_services/category/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipebooks',
  templateUrl: './recipebooks.component.html',
  styleUrls: ['./recipebooks.component.scss']
})
export class RecipebooksComponent {
  books: RecipeBook[] = [];
  searchForm!: FormGroup;
  faCartPlus = faCartPlus;

  constructor(private bookService : RecipebookService, 
              private formBuilder: FormBuilder,
              protected categories : CategoryService) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', [ Validators.required ]],
      category: ['', [Validators.required]],
    });

    this.bookService.searchResults.asObservable().subscribe(books => {
      this.books = books;
    });

    this.updateSearch();
  }

  updateSearch() {
    this.bookService.search(
      this.searchForm.get('search')?.value,
      this.searchForm.get('category')?.value);
  }
}
