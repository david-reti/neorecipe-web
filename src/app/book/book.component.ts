import { Component } from '@angular/core';
import { RecipebookService } from '../_services/recipebook/recipebook.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  constructor(private bookService: RecipebookService) {}

  ngOnInit() {
    
  }
}
