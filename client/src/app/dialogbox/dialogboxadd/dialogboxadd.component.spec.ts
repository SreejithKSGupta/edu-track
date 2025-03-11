import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogboxaddComponent } from './dialogboxadd.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('DialogboxaddComponent', () => {
  let component: DialogboxaddComponent;
  let fixture: ComponentFixture<DialogboxaddComponent>;
  let mockDataService: any;
  let mockNotificationService: any;
  let mockDialogRef: any;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['addStudent']);
    mockNotificationService = jasmine.createSpyObj('NotificationService', ['sendnotification']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DialogboxaddComponent], 
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: DataService, useValue: mockDataService },
        { provide: NotificationService, useValue: mockNotificationService },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogboxaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.studentForm).toBeDefined();
    expect(component.studentForm.get('student_id')).toBeTruthy();
    expect(component.studentForm.get('student_name')).toBeTruthy();
    expect(component.studentForm.get('student_email')).toBeTruthy();
    expect(component.studentForm.get('student_phone')).toBeTruthy();
    expect(component.studentForm.get('gender')).toBeTruthy();
  });

  it('should validate the form when all Fields are required', () => {
    const studentIdControl = component.studentForm.get('student_id');
    studentIdControl?.setValue('');
    expect(studentIdControl?.valid).toBeFalsy();
    const studentNameControl = component.studentForm.get('student_name');
    studentNameControl?.setValue('');
    expect(studentNameControl?.valid).toBeFalsy();
    const studentEmailControl = component.studentForm.get('student_email');
    studentEmailControl?.setValue('');  
    expect(studentEmailControl?.valid).toBeFalsy();
    const studentPhoneControl = component.studentForm.get('student_phone');
    studentPhoneControl?.setValue('');
    expect(studentPhoneControl?.valid).toBeFalsy();
    const genderControl = component.studentForm.get('gender');
    genderControl?.setValue('');
    expect(genderControl?.valid).toBeFalsy();
  });

  it('should validate the email format', () => {
    const emailControl = component.studentForm.get('student_email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should submit form and call addStudent service when form is valid', () => {
    component.studentForm.setValue({
      student_id: '123',
      student_name: 'John Doe',
      student_email: 'john.doe@example.com',
      student_phone: '1234567890',
      gender: 'Male'
    });

    mockDataService.addStudent.and.returnValue(of({}));
    mockNotificationService.sendnotification.and.returnValue(of({}));

    component.onSubmit();

    expect(mockDataService.addStudent).toHaveBeenCalled();
    expect(mockNotificationService.sendnotification).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should not call addStudent if form is invalid', () => {
    component.studentForm.setValue({
      student_id: '',
      student_name: '',
      student_email: 'invalid-email',
      student_phone: '',
      gender: ''
    });

    mockDataService.addStudent.and.returnValue(of({}));
    mockNotificationService.sendnotification.and.returnValue(of({}));

    component.onSubmit();

    expect(mockDataService.addStudent).not.toHaveBeenCalled();
    expect(mockNotificationService.sendnotification).not.toHaveBeenCalled();
  });

  it('should display validation error messages when fields are invalid and touched', () => {
    component.studentForm.get('student_id')?.markAsTouched();
    fixture.detectChanges();
    component.studentForm.get('student_name')?.markAsTouched();
    fixture.detectChanges();
    component.studentForm.get('student_phone')?.markAsTouched();
    fixture.detectChanges();
    
    let errorText = fixture.debugElement.query(By.css('.error-text')).nativeElement;
    expect(errorText.textContent).toContain('Required');

    component.studentForm.get('student_email')?.markAsTouched();
    fixture.detectChanges();
    errorText = fixture.debugElement.query(By.css('.error-text')).nativeElement;
    expect(errorText.textContent).toContain('Required');
  });

  it('should close the dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should handle error in submitting student data', () => {
    component.studentForm.setValue({
      student_id: '123',
      student_name: 'John Doe',
      student_email: 'john.doe@example.com',
      student_phone: '1234567890',
      gender: 'Male'
    });

    mockDataService.addStudent.and.returnValue(throwError('Error'));
    mockNotificationService.sendnotification.and.returnValue(of({}));

    spyOn(window, 'alert');

    component.onSubmit();

    expect(mockDataService.addStudent).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Failed to add student.');
  });

  it('should handle error in submitting student data', () => {
    component.studentForm.setValue({
      student_id: '123',
      student_name: 'John Doe',
      student_email: 'john.doe@example.com',
      student_phone: '1234567890',
      gender: 'Male'
    });
  
    mockDataService.addStudent.and.returnValue(throwError('Error saving student'));
    mockNotificationService.sendnotification.and.returnValue(of({}));
  
    spyOn(window, 'alert');
  
    component.onSubmit();
  
    expect(mockDataService.addStudent).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Failed to add student.');
  });
  
  it('should show success alert when student is added successfully', () => {
    component.studentForm.setValue({
      student_id: '123',
      student_name: 'John Doe',
      student_email: 'john.doe@example.com',
      student_phone: '1234567890',
      gender: 'Male'
    });
  
    mockDataService.addStudent.and.returnValue(of({}));
    mockNotificationService.sendnotification.and.returnValue(of({}));
  
    spyOn(window, 'alert');
  
    component.onSubmit();
  
    expect(mockDataService.addStudent).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Student added successfully!');
  });
  
});
