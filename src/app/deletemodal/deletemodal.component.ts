import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RecipebookService } from '../_services/recipebook/recipebook.service';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.scss']
})
export class DeletemodalComponent {
  open = false;

  @Input() forType: string = "book"
  @Input() slug: string = "";

  constructor(private router: Router, private recipeBooks: RecipebookService) {}

  openModal() {
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }

  attemptDeletion() {
    switch(this.forType) {
      case "book":
        this.recipeBooks.delete(this.slug).subscribe(() => {
          this.router.navigateByUrl('/books');
        });
        break;
      default:
        break;
    }
  }
}
