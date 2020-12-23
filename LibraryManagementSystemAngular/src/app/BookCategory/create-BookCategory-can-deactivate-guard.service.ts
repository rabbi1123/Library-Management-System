import {CanDeactivate} from '@angular/router';
import { CreateBookCategoryComponent } from './create-book-category.component';
import { Injectable } from "@angular/core";

@Injectable()
export class CreateBookCategoryCanDeactivateGuardService implements CanDeactivate<CreateBookCategoryComponent>{
    canDeactivate(component: CreateBookCategoryComponent): boolean{
        if(component.createBookCategoryForm.dirty){
            return confirm('Are you sure you want to discard your changes?');
        }

        return true;
    }
    
}