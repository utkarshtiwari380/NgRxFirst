import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as bookActions from "./book.action";
import { BookService } from "./book.service";
import { mergeMap,map, catchError, of } from "rxjs";

@Injectable()
export class BookEffect {

    //this is ngrx effect that responded to 'AddBook' actions.
    addBook$ = createEffect(()=> this.actions$.pipe(
        // Listen for action of type 'AddBook'
        ofType(bookActions.AddBook),

        // For each 'AddBook' action, call, 'addBook' on the book service.
        // 'mergeMap' allows multiple concurrent 'addBook' calls.
        mergeMap((action) => this.bookService.addBook(action)
        .pipe(
            // If the 'addBook' call is successfull, dispatch 'AddBookSuccess' action with the book data
            map(book => bookActions.AddBookSucess(book)),
            
            // If 'addBook' call fail, dispatch 'AddBookFailure' action with the error.
            catchError((error) => of(bookActions.AddBookFailure({error})))
        ))
    ));

    constructor(
        private actions$:Actions,
        private bookService:BookService
        ){}

}