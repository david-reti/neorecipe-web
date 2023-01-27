import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, tap } from 'rxjs';
import { RecipeBook, RecipeBookData } from '../../_models/RecipeBook';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URLS } from '../../urls';
import { MessageService } from '../message/message.service';

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
      catchError((error, _) => this.handleError(error, _)), 
    );
  }

  private handleError(error : HttpErrorResponse, caught : Observable<any>): Observable<any> {
    if(error.status === 0) {
      this.messageService.sendError(`An client-side error (status 0) occured when attempting to get ${error.url}`);
    } else {
      this.messageService.sendError(`Error ${error.status} (${error.statusText}) when attempting to get ${error.url}`);
    }
    return of();
  }
}
