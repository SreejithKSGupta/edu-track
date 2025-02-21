import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialogboxadd',
  imports: [MatDialogContent, MatDialogActions, NgIf, ReactiveFormsModule],
  templateUrl: './dialogboxadd.component.html',
  styleUrl: './dialogboxadd.component.scss'
})
export class DialogboxaddComponent {
  studentForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogboxaddComponent>, private fb: FormBuilder) {}


  ngOnInit(): void {
    this.studentForm = this.fb.group({
      student_id: ['', Validators.required],
      student_name: ['', Validators.required],
      student_email: ['', [Validators.required, Validators.email]],
      student_phone: ['', Validators.required],
      gender: ['', Validators.required],
      age: [null] // optional field: no validators attached
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      console.log('Student Data:', this.studentForm.value);
      // Handle the form submission (e.g., send to a backend service)
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
