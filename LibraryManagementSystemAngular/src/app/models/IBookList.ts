import { BookCategory } from "src/app/models/BookCategory.model";

export interface IBookList {
    Book_ID: number;
    Author:string;
    Title:string;
    Category_ID: number;
    BookCategory: BookCategory;
}