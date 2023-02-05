import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../_services/category/category.service';
import { MessageService } from '../_services/message/message.service';
import { RecipebookService } from '../_services/recipebook/recipebook.service';

import { RecipeBook } from '../_models/RecipeBook';

@Component({
  selector: 'app-bookcreate',
  templateUrl: './bookcreate.component.html',
  styleUrls: ['./bookcreate.component.scss']
})
export class BookcreateComponent {
  constructor(protected categories: CategoryService, 
              private recipeBooks: RecipebookService,
              private router : Router,
              protected messages: MessageService) {}

  attemptBookCreation(form: FormGroup) {    
    const pubDate = form.get('publicationDate')?.value;
    let toCreate: RecipeBook = {
        title: form.get('title')!.value,
        // description: '',
        slug: form.get('title')!.value.replace(' ', '-').toLowerCase(),
        isbn: form.get('isbn')?.value,
        category: form.get('category')!.value,
        publisher: form.get('publisher')?.value,
        // style: '',
        // contributors: [],
        sections: [],
        publicly_accessible: form.get('publiclyAccessible')!.value
    }

    if(pubDate) {
      toCreate.publication_date = pubDate;
    }

    this.recipeBooks.create(toCreate).subscribe(_ => {
      this.messages.sendSuccess('Book created successfully');
      this.router.navigateByUrl(`/books/${toCreate.slug}`);
    })
  }
}
