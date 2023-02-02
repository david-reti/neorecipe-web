import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeBook } from '../_models/RecipeBook';
import { RecipebookService } from '../_services/recipebook/recipebook.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  book: RecipeBook | null = null;
  constructor(private bookService: RecipebookService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.bookService.getSingleBook(this.route.snapshot.params['slug']).subscribe(value => {
      this.book = value;
      document.title = `Neorecipe | ${this.book.title}`
    });
  }

  publicationDate() {
    return new Date(this.book?.publication_date!).getFullYear();
  }

}
