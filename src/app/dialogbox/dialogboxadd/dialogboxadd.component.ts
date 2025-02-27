import { NotificationService } from './../../services/notification.service';
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

  constructor(public dialogRef: MatDialogRef<DialogboxaddComponent>, private fb: FormBuilder, private dataService: DataService, private notificationService: NotificationService) {}


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

      let notification = {
        title: `${this.studentForm.value.student_name} added`,
        type: 'student added',
        message: `Student ID: ${this.studentForm.value.student_id}, Name: ${this.studentForm.value.student_name}`,
        read: false,
        data: []


      }

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
      this.notificationService.sendnotification(notification).subscribe(
        (response) => {
          console.log('Notification Sent:', response);
        },
        (error) => {
          console.error('Error sending notification:', error);
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
