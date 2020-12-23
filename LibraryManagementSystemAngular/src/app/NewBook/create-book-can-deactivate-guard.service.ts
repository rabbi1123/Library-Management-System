import { CanDeactivate } from '@angular/router';
import { Injectable } from "@angular/core";
import { CreateNewBookComponent } from "src/app/NewBook/create-new-book.component";

@Injectable()
export class CreateBookCanDeactivateGuardService implements CanDeactivate<CreateNewBookComponent>{
    canDeactivate(component: CreateNewBookComponent): boolean {
        if (component.BookForm.dirty) {
            return confirm('Are you sure you want to discard your changes?');
        }

        return true;
    }

}