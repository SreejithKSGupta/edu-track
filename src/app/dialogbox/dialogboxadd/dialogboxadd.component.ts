import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialogboxadd',
  imports: [MatDialogContent, MatDialogActions, NgIf, ReactiveFormsModule],
  templateUrl: './dialogboxadd.component.html',
  styleUrl: './dialogboxadd.component.scss'
})
export class DialogboxaddComponent {
  studentForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogboxaddComponent>, private fb: FormBuilder, private dataService: DataService) {}


  ngOnInit(): void {
    this.studentForm = this.fb.group({
      student_id: ['', Validators.required],
      student_name: ['', Validators.required],
      student_email: ['', [Validators.required, Validators.email]],
      student_phone: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.dataService.addStudent(this.studentForm.value).subscribe(
        (response) => {
          console.log('Student Data Saved:', response);
          alert('Student added successfully!');
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error saving student:', error);
          alert('Failed to add student.');
        }
      );
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
