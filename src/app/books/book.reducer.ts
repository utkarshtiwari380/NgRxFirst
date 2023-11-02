import { createReducer, on } from "@ngrx/store";
import { AddBook,RemoveBook,AddBookSucess,AddBookFailure } from "./book.action";
import { Book } from "../models/book";

export const initialState :Book[] = [];

export const BookReducer = createReducer(
    initialState,
    on(AddBook, (state) =>{return state}),
    on(AddBookSucess, (state, {id, title, author}) => [...state,{id,title,author}]),
    on(AddBookFailure, (state, {error}) => {
        console.error(error);
        return state;
    }),
    on(RemoveBook,(state, {bookId})=> state.filter(book => book.id !== bookId))
);