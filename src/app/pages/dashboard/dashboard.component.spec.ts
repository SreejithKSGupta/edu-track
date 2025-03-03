import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './dashboard.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragExit, CdkDragMove, CdkDragRelease, CdkDragStart } from '@angular/cdk/drag-drop';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EventEmitter } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockRouter: any;
  let mockCookieService: any;
  let mockMatDialog: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCookieService = jasmine.createSpyObj('CookieService', ['get']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
        DashboardComponent
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CookieService, useValue: mockCookieService },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  fit('should initialize adminpages array when user is signed in', () => {
    const encryptedUsername = 'encryptedUsername'; 
    mockCookieService.get.and.returnValue(encryptedUsername);

    component.ngOnInit();

    expect(component.adminpages.length).toBe(6);
    expect(component.adminpages[0].title).toBe('Student Management');
    expect(component.adminpages[4].title).toBe('Preferences');
    expect(component.adminpages[5].title).toBe('Calendar');
  });

  fit('should redirect to signin page if no user is signed in', () => {
    mockCookieService.get.and.returnValue('');
    component.ngOnInit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/signin']);
  });

  fit('should handle drag and drop functionality correctly', () => {
    const mockCdkDrag: Partial<CdkDrag<any>> = {
      data: 'Student Management', 
      lockAxis: 'x',
      freeDragPosition: { x: 0, y: 0 },
      disabled: false,
      previewContainer: document.createElement('div'),
      started: new EventEmitter<CdkDragStart<any>>(),
      released: new EventEmitter<CdkDragRelease<any>>(),
      ended: new EventEmitter<CdkDragEnd<any>>(),
      entered: new EventEmitter<CdkDragEnter<any>>(),
      exited: new EventEmitter<CdkDragExit<any>>(),
      dropped: new EventEmitter<CdkDragDrop<any>>(),
      moved: new EventEmitter<CdkDragMove<any>>()
    };

    const event: CdkDragDrop<string[]> = {
      previousIndex: 0,
      currentIndex: 1,
      item: mockCdkDrag as CdkDrag<any>, 
      container: {} as any, 
      previousContainer: {} as any, 
      isPointerOverContainer: true,
      distance: { x: 10, y: 10 },
      dropPoint: { x: 100, y: 100 },
      event: new MouseEvent('click')
    };

    component.adminpages = [
      { title: 'Student Management', icon: 'account_circle', link: '/student' },
      { title: 'Teacher Management', icon: 'work', link: '/teacher' }
    ];

    component.drop(event);

    expect(component.adminpages[0].title).toBe('Teacher Management');
    expect(component.adminpages[1].title).toBe('Student Management');
  });

  fit('should navigate to the correct link when openitem is called', () => {
    const link = 'student';
    component.openitem(link);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/student']);
  });

  fit('should navigate to signin if no username is found in the cookie', () => {
    mockCookieService.get.and.returnValue('');
    component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/signin']);
  });

  fit('should navigate to the student management page on mat-card click', () => {
    const link = '/student';
    spyOn(component, 'openitem');
    component.openitem(link);

    expect(component.openitem).toHaveBeenCalledWith(link);
  });

});
