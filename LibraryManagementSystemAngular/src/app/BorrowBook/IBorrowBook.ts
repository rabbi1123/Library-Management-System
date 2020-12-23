import { IBorrowBookDetails } from "src/app/BorrowBook/IBorrowBookDetails";
import { IStudent } from "src/app/models/IStudent";

export interface IBorrowBook {
    BorrowBook_ID: number;
    Student_ID: number;
    CurrentDate: Date;
    ReturnDate: Date;
    ReceivedDate: Date;
    Status: string;
    Student: IStudent;
    BorrowBookDetails: IBorrowBookDetails[];
}