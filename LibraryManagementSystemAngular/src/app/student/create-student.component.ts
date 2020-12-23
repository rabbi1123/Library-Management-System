import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AbstractControl } from "@angular/forms";
import { CustomMailValidators } from "src/app/shared/custom.mailValidators";
import { ActivatedRoute } from "@angular/router";
import { StudentService } from "src/app/student/student.service";
import { IStudent } from "src/app/models/IStudent";
import { Router } from "@angular/router";
import { ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { StudentCourse } from "src/app/models/StudentCourse.model";
import { StudentCourseService } from "src/app/StudentCourse/StudentCourse.service";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  @ViewChild('newStudentForm') public NewStudentForm: NgForm;

  studentForm: FormGroup;
  student: IStudent;
  studentCourse: StudentCourse[];
  pageTitle: string;
  fileImage: File;
  dialogData: number;

  validationMessages = {
    'firstName': {
      'required': 'First Name is Required.',
      'minlength': 'First Name must be greater than 2 characters.',
      'maxlength': 'First Name must be less than 20 characters.'
    },
    'lastName': {
      'required': 'Last Name is Required.',
      'minlength': 'First Name must be greater than 2 characters.',
      'maxlength': 'First Name must be less than 20 characters.'
    },
    'email': {
      'required': 'Email is Required.',
      'emailDomain': 'Email Domain should be gmail.com.'
    },
    'confirmEmail': {
      'required': 'Confirm Email is Required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm Email do not match.'
    },
    'phone': {
      'required': 'Phone number is Required.'
    },
    'course_ID': {
      'required': 'Course is Required.'
    },
  };

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
    'phone': '',
    'course_ID': ''
  };

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router, private _StudentCourseService:StudentCourseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateStudentComponent>) { }
      

  ngOnInit() {
    this.dialogData = this.data.ID;

    this._StudentCourseService.getCourses().subscribe(
      (res: any) => this.studentCourse = res
      
    );

    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomMailValidators.emailDomain('gmail.com')]],
        confirmEmail: ['', Validators.required],
      }, { validator: matchEmail }),
      phone: [''],
      course_ID: ['', Validators.required],
      photo: ['']
    });

    this.studentForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    });

    this.studentForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.studentForm);
    });

    
      if (this.dialogData) {
        this.pageTitle = 'Edit Student';
        this.getStudent(this.dialogData);
      }
      else {
        this.pageTitle = 'Create Student';
        this.student = {
          Student_ID: null,
          First_Name: '',
          Last_Name: '',
          ContactPreference: '',
          Email: '',
          Phone: '',
          Photo: null,
          Course_ID: null,
          StudentCourse: null,
          BorrowBooks: null
        };
      }

  }

  getStudent(id: number) {
    this.studentService.getStudent(id).subscribe(
      (student: IStudent) => {
        this.editStudent(student);
        this.student = student;
      },
      (err: any) => console.log(err)
    );
  }

  editStudent(student: IStudent) {
    this.studentForm.patchValue({
      firstName: student.First_Name,
      lastName: student.Last_Name,
      contactPreference: student.ContactPreference,
      emailGroup: {
        email: student.Email,
        confirmEmail: student.Email
      },
      phone: student.Phone,
      course_ID: student.Course_ID
    });
  }

  onContactPreferenceChange(selectedValue: string) {
    const phoneControl = this.studentForm.get('phone');
    const emailControl = this.studentForm.get('emailGroup');
    const preEmail = emailControl.get('email');
    const preconfirmEmail = emailControl.get('confirmEmail');
    if (selectedValue === 'phone') {
      phoneControl.setValidators(Validators.required);
      preEmail.clearValidators();
      preconfirmEmail.clearValidators();

      preEmail.setValidators(CustomMailValidators.emailDomain('gmail.com'));
    } else {
      phoneControl.clearValidators();
      preEmail.setValidators([Validators.required, CustomMailValidators.emailDomain('gmail.com')]);
      preconfirmEmail.setValidators(Validators.required);
    }
    phoneControl.updateValueAndValidity();
    preEmail.updateValueAndValidity();
    preconfirmEmail.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.studentForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  fileSelected(file: FileList) {
    this.fileImage = file.item(0);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.mapFormValuesToStudentModel();
    if (this.student.Student_ID) {
      this.studentService.updateStudent(this.student).subscribe(
        /* () => this.router.navigate(['student']), */
        () => this.dialogRef.close(),
        (err: any) => this.router.navigate(['notfound'])
      );
    }
    else {
      this.studentService.addStudent(this.student,this.fileImage).subscribe(
        () => this.dialogRef.close()
      );
    }
  }

  mapFormValuesToStudentModel() {
    this.student.First_Name = this.studentForm.value.firstName;
    this.student.Last_Name = this.studentForm.value.lastName;
    this.student.ContactPreference = this.studentForm.value.contactPreference;
    this.student.Email = this.studentForm.value.emailGroup.email;
    this.student.Phone = this.studentForm.value.phone;
    this.student.Photo = null;
    this.student.Course_ID = this.studentForm.value.course_ID;
  }

}

function matchEmail(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value || (confirmEmailControl.pristine && confirmEmailControl.value === '')) {
    return null;
  }
  else {
    return { 'emailMismatch': true };
  }
}


