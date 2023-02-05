import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeBook } from '../_models/RecipeBook';
import { MessageService } from '../_services/message/message.service';
import { RecipebookService } from '../_services/recipebook/recipebook.service';

@Component({
  selector: 'app-bookedit',
  templateUrl: './bookedit.component.html',
  styleUrls: ['./bookedit.component.scss']
})
export class BookeditComponent {
  title = 'Edit';
  recipeBook: RecipeBook | null = null;

  constructor(private bookService: RecipebookService, 
              private messages: MessageService,
              private router: Router,
              private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.bookService.getSingleBook(this.route.snapshot.params['slug']).subscribe(book => {
      this.recipeBook = book;
      this.title = `Edit ${this.recipeBook.title}`;
      document.title = `Neorecipe | ${this.title}`;
    });
  }

  attemptEdit(form: FormGroup) {
    const pubDate = form.get('publicationDate')?.value;
    let toUpdate: RecipeBook = {
        title: form.get('title')!.value,
        // description: '',
        slug: form.get('slug')!.value,
        isbn: form.get('isbn')?.value,
        category: form.get('category')!.value,
        publisher: form.get('publisher')?.value,
        // style: '',
        // contributors: [],
        sections: [],
        publicly_accessible: form.get('publiclyAccessible')!.value
    }

    if(pubDate) {
      toUpdate.publication_date = pubDate;
    }

    this.bookService.update(toUpdate).subscribe(_ => {
      this.messages.sendSuccess('Book updated successfully');
      this.router.navigateByUrl(`/books/${toUpdate.slug}`);
    });
  }
}
