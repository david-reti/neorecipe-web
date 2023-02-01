import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CategorySelectedValidator from '../_util/categorySelectedValidator';
import DateValidator from '../_util/dateValidator';

@Component({
  selector: 'app-bookcreate',
  templateUrl: './bookcreate.component.html',
  styleUrls: ['./bookcreate.component.scss']
})
export class BookcreateComponent {
  form! : FormGroup;
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      category: ['Select Category', [CategorySelectedValidator()]],
      isbn: [''],
      publisher: ['', [Validators.minLength(3), Validators.maxLength(255)]],
      publicationDate: ['', [ DateValidator() ]],
    });
  }

  attemptBookCreation() {

  }
}
