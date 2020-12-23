import { StudentCourse } from "src/app/models/StudentCourse.model";
import { IBorrowBook } from "src/app/BorrowBook/IBorrowBook";

export interface IStudent {
    Student_ID:number;
    First_Name:string;
    Last_Name:string;
    ContactPreference:string;
    Email:string;
    Phone:string;
    Photo: any;
    Course_ID: number;
    StudentCourse: StudentCourse;
    BorrowBooks: IBorrowBook[];
}