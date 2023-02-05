import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeBook } from '../_models/RecipeBook';
import { CategoryService } from '../_services/category/category.service';
import { MessageService } from '../_services/message/message.service';
import { RecipebookService } from '../_services/recipebook/recipebook.service';
import CategorySelectedValidator from '../_util/categorySelectedValidator';
import DateValidator from '../_util/dateValidator';

@Component({
  selector: 'app-bookform',
  templateUrl: './bookform.component.html',
  styleUrls: ['./bookform.component.scss']
})
export class BookformComponent {
  form! : FormGroup;
  initialIndex = 0;
  loading = false;

  initialCategory = '';

  @Input() formAction = (form: FormGroup) => {};
  @Input() backRoute = "/books";
  @Input() title = "Create Book";
  @Input() action = "Create";
  @Input() initialValues : RecipeBook | null = null;

  constructor(private formBuilder: FormBuilder, 
    protected categories: CategoryService,
    protected bookService: RecipebookService,
    protected router: Router,
    protected messages: MessageService) {}

  ngOnInit() {
    this.initialCategory = (this.initialValues && this.initialValues.category) ? this.initialValues.category : 'Select Category';

    this.categories.getBookCategories().forEach((val, i) => {
      if(val == this.initialCategory) {
        this.initialIndex = i + 1;
      }
    });

    this.form = this.formBuilder.group({
      title: [this.initialValues?.title || '', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      category: [this.initialCategory, [CategorySelectedValidator()]],
      isbn: [this.initialValues?.isbn || ''],
      slug: [this.initialValues?.slug || ''],
      publisher: [this.initialValues?.publisher || '', [Validators.minLength(3), Validators.maxLength(255)]],
      publicationDate: [this.initialValues?.publication_date || '', [ DateValidator() ]],
      publiclyAccessible: [this.initialValues?.publicly_accessible || false],
    });
  }
}
