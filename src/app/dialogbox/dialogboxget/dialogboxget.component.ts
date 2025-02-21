import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialogboxget',
  imports: [MatDialogContent, MatDialogActions, ReactiveFormsModule, NgIf],
  templateUrl: './dialogboxget.component.html',
  styleUrl: './dialogboxget.component.scss'
})
export class DialogboxgetComponent {
  studentForm!: FormGroup;
  studentData: any = null;

  constructor(public dialogRef: MatDialogRef<DialogboxgetComponent>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      student_id: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      // Here we simulate getting student data based on the provided student_id.
      // Replace this with an API call as needed.
      const id = this.studentForm.value.student_id;
      this.dummyStudentData();
    } else {
      this.studentForm.markAllAsTouched();
    }
  }
  
  private dummyStudentData() {
    this.studentData = {
      student_id: "123",
      student_name: 'John Doe',
      student_email: 'john.doe@example.com',
      student_phone: '123-456-7890',
      gender: 'Male',
      age: 20
    };
  }

    closeDialog() {
      this.dialogRef.close();
    }
}
