import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogboxgetComponent } from './dialogboxget.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { of, throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

describe('DialogboxgetComponent', () => {
  let component: DialogboxgetComponent;
  let fixture: ComponentFixture<DialogboxgetComponent>;
  let mockDataService: any;
  let mockDialogRef: any;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['getStudentById']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule, CommonModule, DialogboxgetComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogboxgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with student_id as required', () => {
    expect(component.studentForm).toBeTruthy();
    expect(component.studentForm.get('student_id')).toBeTruthy();
    expect(component.studentForm.get('student_id')?.hasError('required')).toBeTruthy();
  });

  it('should call getStudentById when form is valid and submit', () => {
    const studentId = '123';
    mockDataService.getStudentById.and.returnValue(of({ id: '123', name: 'John Doe' }));

    component.studentForm.setValue({ student_id: studentId });
    component.onSubmit();

    expect(mockDataService.getStudentById).toHaveBeenCalledWith(studentId);
    expect(component.studentData).toEqual({ id: '123', name: 'John Doe' });
  });

  it('should display error message when student is not found', () => {
    const studentId = '999';
    mockDataService.getStudentById.and.returnValue(of(null));

    component.studentForm.setValue({ student_id: studentId });
    component.onSubmit();

    expect(mockDataService.getStudentById).toHaveBeenCalledWith(studentId);
    expect(component.studentData).toEqual([]); 
  });

  it('should handle error when fetching student data', () => {
    const studentId = '123';
    mockDataService.getStudentById.and.returnValue(throwError('Error fetching student data'));

    component.studentForm.setValue({ student_id: studentId });
    component.onSubmit();

    expect(mockDataService.getStudentById).toHaveBeenCalledWith(studentId);
    expect(component.studentData).toEqual([]); 
  });

  it('should close the dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
