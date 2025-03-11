import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialogboxget',
  imports: [MatDialogContent, MatDialogActions, ReactiveFormsModule, NgIf,CommonModule],
  templateUrl: './dialogboxget.component.html',
  styleUrl: './dialogboxget.component.scss'
})
export class DialogboxgetComponent {
  studentForm!: FormGroup;
  studentData: any;

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
        (students) => { 
          if (students) {
            this.studentData = students; 
          } else {
            this.studentData = []; 
            alert('Student not found!');
          }
        },
        (error) => {
          this.studentData = [];
          console.error('Error fetching student:', error);
          alert('Error fetching student data. Please try again.');
        }
      );
    }
    else {
      this.studentForm.markAllAsTouched();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

