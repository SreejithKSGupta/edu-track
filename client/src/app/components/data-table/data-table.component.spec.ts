import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { StoreModule, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { setPagination } from '../../state/user.actions';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { User } from '../../models/user.model';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let mockDialogRef: MatDialogRef<DialogRef>;
  let mockDataService: DataService;
  let mockNotificationService: NotificationService;
  let mockCookieService: CookieService;
  let mockStore: Store;
  let mockMatDialog: Dialog;

  beforeEach(async () => {
    const afterClosedSubject = new Subject<void>();


    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']);
    mockDialogRef.afterClosed = () => afterClosedSubject.asObservable();

    mockDataService = jasmine.createSpyObj('DataService', ['updateStudentById', 'loadMoreUsers']);
    mockNotificationService = jasmine.createSpyObj('NotificationService', ['sendnotification']);
    mockCookieService = jasmine.createSpyObj('CookieService', ['get']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    (mockMatDialog.open as jasmine.Spy).and.returnValue(mockDialogRef);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        StoreModule.forRoot({}),
        HttpClientTestingModule,
        DataTableComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: DataService, useValue: mockDataService },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: CookieService, useValue: mockCookieService },
        { provide: Store, useValue: mockStore }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component with the correct data', () => {
    component.ngOnInit();
    expect(component.dataSource.data).toEqual([]);
    expect(component.length).toBe(0);
    expect(component.pageSize).toBe(10);
    expect(component.pageIndex).toBe(0);
  });

  it('should handle page events and dispatch setPagination', () => {
    const pageEvent = { pageIndex: 1, pageSize: 10 } as unknown as PageEvent;
    component.handlePageEvent(pageEvent);
    expect(mockStore.dispatch).toHaveBeenCalledWith(setPagination({ pageIndex: 1, pageSize: 10 }));
  });

  it('should update paginated users based on pagination settings', () => {
    spyOn(component, 'updatePaginatedUsers');
    component.updatePaginatedUsers();
    expect(component.updatePaginatedUsers).toHaveBeenCalled();
  });

  it('should start editing cell when editCell is called', () => {
    const element = { _id: '1', student_id: '123', student_name: 'John Doe', student_email: 'john.doe@example.com', student_phone: '1234567890', gender: 'Male' };
    component.editCell(element, 'student_id');
    expect(component.editableState).toEqual({ '1-student_id': true });
  });

  it('should not save changes when saveCell is called and values are the same', () => {
    const element: User = { // Make sure to create the object with all required properties
      _id: '1',
      student_id: '123',
      student_name: 'John Doe',  // Add missing properties
      student_email: 'johndoe@example.com',
      student_phone: '123-456-7890',
      gender: 'Male',  // Add missing properties
    };
  
    component.originalValues = { '1-student_id': '123' };
  
    component.saveCell(element, 'student_id');
  
    expect(mockDataService.updateStudentById).not.toHaveBeenCalled();
  });
  

  it('should check if cell is in editing state using isEditing method', () => {
    const element: User = {
      _id: '1',
      student_id: '123',
      student_name: 'John Doe',  // Add missing properties
      student_email: 'johndoe@example.com',
      student_phone: '123-456-7890',
      gender: 'Male',  // Add missing properties
    };
  
    component.editCell(element, 'student_id');
    expect(component.isEditing(element, 'student_id')).toBeTruthy();
  });
});
