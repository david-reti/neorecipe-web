import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, map, of, Subject } from 'rxjs';
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

  searchTerms: Subject<string> = new Subject<string>();
  searchResults: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor(private http: HttpClient, private messageService: MessageService, private auth: AuthService) { 
    this.searchTerms.asObservable().pipe(
      debounceTime(300),
    ).subscribe(term => {
      this.http.get(BACKEND_URLS.RECIPES).pipe(
        map((recipes : any) => recipes.results),
        catchError(err => {
          this.messageService.sendError("Could not retrieve recipes");
          return of();
        })
      ).subscribe((recipes : any) => {
        this.searchResults.next(recipes);
      });
    });
  }

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

  search(term: string) {
    this.searchTerms.next(term);
  }

  getResults() {
    return this.searchResults.asObservable();
  }

  getSingleRecipe(slug: string) {
    return this.http.get(BACKEND_URLS.SINGLE_RECIPE.replace('${slug}', slug)).pipe(
      catchError(err => {
        if(err.error) {
          this.messageService.sendError(`Could not fetch recipe: ${slug}`);
        }
        return of();
      })
    );
  }

  regenerateRecommendedRecipes() {
    this.messageService.sendInfo('It will take some time for new recipes to be recommended for you - check back in a few minutes!');
  }
}
