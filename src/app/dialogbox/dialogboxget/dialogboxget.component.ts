import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialogboxget',
  imports: [MatDialogContent, MatDialogActions, ReactiveFormsModule, NgIf],
  templateUrl: './dialogboxget.component.html',
  styleUrl: './dialogboxget.component.scss'
})
export class DialogboxgetComponent {
  studentForm!: FormGroup;
  studentData: any = null;
  constructor(public dialogRef: MatDialogRef<DialogboxgetComponent>, private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      student_id: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentId = this.studentForm.value.student_id;

      this.dataService.getStudentById(studentId).subscribe(
        (student) => {
          if (student) {
            this.studentData = student; // ✅ Store retrieved data
            console.log('Student Data:', student);
          } else {
            this.studentData = null;
            alert('Student not found!');
          }
        },
        (error) => {
          this.studentData = null;
          console.error('Error fetching student:', error);
          alert('Error fetching student data. Please try again.');
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
