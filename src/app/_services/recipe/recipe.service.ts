import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, Subject } from 'rxjs';
import { Recipe } from 'src/app/_models/Recipe';
import { BACKEND_URLS } from 'src/app/urls';
import { AuthService } from '../auth/auth.service';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recommendedRecipes: Recipe[] = [];
  recommendedRecipes$: Subject<Recipe[]> = new Subject();

  constructor(private http: HttpClient, private messageService: MessageService, private auth: AuthService) { }

  getRecommendedRecipes() {
    if(this.recommendedRecipes.length === 0) {
      this.http.get(BACKEND_URLS.RECOMMENDED_RECIPES.replace('${userID}', this.auth.userID.toString())).pipe(
        catchError(err => {
          if(err.error) {
            this.messageService.sendError('Could not fetch the recommended recipes for the current user');
          }
          return of();
        })
      ).subscribe((recipes:any) => {
        this.recommendedRecipes$.next(recipes.results);
      });
    }
    return this.recommendedRecipes$.asObservable();
  }
}
