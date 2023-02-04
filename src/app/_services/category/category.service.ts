import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  bookCategories = ['French', 'Other']

  constructor() { }

  getBookCategories() {
    return this.bookCategories;
  }
}
