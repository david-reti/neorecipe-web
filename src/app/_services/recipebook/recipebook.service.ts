import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, tap, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
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

  searchCriteria: Subject<{title: string, category: string}> = new Subject<any>();
  searchResults: Subject<RecipeBook[]> = new Subject<RecipeBook[]>();

  constructor(private http:HttpClient, private messageService: MessageService) { 
    this.searchCriteria.asObservable().pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(term => {
      let toget = new URL(BACKEND_URLS.RECIPE_BOOKS);
      if(term.title) { toget.searchParams.append('title', term.title) }
      if(term.category) { toget.searchParams.append('category', term.category) }

      this.http.get(toget.toString()).pipe(
        tap((response : any) => {
          this.numBooks = response.count;
          this.next = response.next || "";
          this.previous = response.previous || "";
        }),
        map(response => response.results),
        catchError((error, _) => this.handleError(error, 'search books', _)),
      ).subscribe(books => {
        this.searchResults.next(books);
      });
    });
  }

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

  search(title: string, category: string) {
    this.searchCriteria.next({
      title: title,
      category: category
    });
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
