import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, tap } from 'rxjs';
import { RecipeBook, RecipeBookData } from '../../_models/RecipeBook';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URLS } from '../../urls';
import { MessageService } from '../message/message.service';
import { Recipe } from 'src/app/_models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipebookService {
  numBooks: Number = 0; 
  next: String = "";
  previous: String = "";

  constructor(private http:HttpClient, private messageService: MessageService) { }

  getBooks() : Observable<RecipeBook[]> {
    return this.http.get<RecipeBookData>(BACKEND_URLS.RECIPE_BOOKS).pipe(
      tap(response => {
        this.numBooks = response.count;
        this.next = response.next || "";
        this.previous = response.previous || "";
      }),
      map(response => response.results),
      catchError((error, _) => this.handleError(error, 'retrieve books', _)), 
    );
  }

  getSingleBook(slug: string) : Observable<RecipeBook> {
    return this.http.get<RecipeBook>(BACKEND_URLS.SINGLE_RECIPE_BOOK.replace('${slug}', slug)).pipe(
      catchError((error, _) => this.handleError(error, 'retrieve book', _)),
    );
  }

  create(toCreate: RecipeBook) {
    return this.http.post(BACKEND_URLS.RECIPE_BOOKS, toCreate).pipe(
      catchError((error, _) => this.handleError(error, 'create book', _)),
    );
  }

  update(toUpdate: RecipeBook) {
    return this.http.put(BACKEND_URLS.SINGLE_RECIPE_BOOK.replace('${slug}', toUpdate.slug), toUpdate).pipe(
      catchError((error, _) => this.handleError(error, 'update book', _)),
    );
  }

  delete(toDeleteSlug: string) {
    return this.http.delete(BACKEND_URLS.SINGLE_RECIPE_BOOK.replace('${slug}', toDeleteSlug)).pipe(
      catchError((error, _) => this.handleError(error, 'delete book', _)),
    );
  }

  private handleError(error : HttpErrorResponse, action: string, caught : Observable<any>): Observable<any> {
    if(error.status === 0) {
      this.messageService.sendError(`An client-side error (status 0) occured when attempting to ${action} at ${error.url}`);
    } else {
      this.messageService.sendError(`Error ${error.status} (${error.statusText}) when attempting to ${action} at ${error.url}`);
    }
    return of();
  }
}
