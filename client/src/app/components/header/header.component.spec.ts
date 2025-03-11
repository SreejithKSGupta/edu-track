import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification.service';
import { RouterTestingModule } from '@angular/router/testing'; 
import { HeaderComponent } from './header.component';
import { AdminserviceService } from '../../services/adminservice.service';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';  
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockThemeService: any;
  let mockRouter: any;
  let mockDialog: any;
  let mockNotificationService: any;
  let mockAdminservice: any;

  beforeEach(async () => {
    mockThemeService = jasmine.createSpyObj('ThemeService', ['toggleTheme']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockNotificationService = jasmine.createSpyObj('NotificationService', ['getNotifications', 'unreadCount']);
    mockAdminservice = jasmine.createSpyObj('AdminserviceService', ['isAuthenticated', 'logout']);

    mockAdminservice.isAuthenticated = true;
    mockNotificationService.unreadCount = jasmine.createSpy().and.returnValue(5);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]), 
        MatIconModule,                       
        MatButtonModule,
        MatBadgeModule,
        HeaderComponent
      ],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: AdminserviceService, useValue: mockAdminservice }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme when toggleTheme is called', () => {
    mockThemeService.toggleTheme.and.callThrough();

    component.toggleTheme();

 
    expect(mockThemeService.toggleTheme).toHaveBeenCalled();

    fixture.detectChanges();
    const themeToggleButton = fixture.nativeElement.querySelector('.theme-toggle-btn mat-icon');
    expect(themeToggleButton.textContent).toBe(component.isDarkMode ? 'dark_mode' : 'light_mode');
  });
});
