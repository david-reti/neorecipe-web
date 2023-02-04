import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../_services/category/category.service';
import { MessageService } from '../_services/message/message.service';
import { RecipebookService } from '../_services/recipebook/recipebook.service';
import CategorySelectedValidator from '../_util/categorySelectedValidator';
import DateValidator from '../_util/dateValidator';

import { RecipeBook } from '../_models/RecipeBook';

@Component({
  selector: 'app-bookcreate',
  templateUrl: './bookcreate.component.html',
  styleUrls: ['./bookcreate.component.scss']
})
export class BookcreateComponent {
  form! : FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, 
              protected categories: CategoryService, 
              private recipeBooks: RecipebookService,
              private router : Router,
              protected messages: MessageService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      category: ['Select Category', [CategorySelectedValidator()]],
      isbn: [''],
      publisher: ['', [Validators.minLength(3), Validators.maxLength(255)]],
      publicationDate: ['', [ DateValidator() ]],
      publiclyAccessible: [false],
    });
  }

  attemptBookCreation() {
    this.loading = true;
    
    const pubDate = this.form.get('publicationDate')?.value;
    let toCreate: RecipeBook = {
        title: this.form.get('title')!.value,
        // description: '',
        slug: this.form.get('title')!.value.replace(' ', '-').toLowerCase(),
        isbn: this.form.get('isbn')?.value,
        category: this.form.get('category')!.value,
        publisher: this.form.get('publisher')?.value,
        // style: '',
        // contributors: [],
        sections: [],
        publicly_accessible: this.form.get('publiclyAccessible')!.value
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
