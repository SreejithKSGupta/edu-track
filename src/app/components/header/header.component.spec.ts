import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './../../services/notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockThemeService: any;
  let mockRouter: any;
  let mockDialog: any;
  let mockNotificationService: any;

  beforeEach(async () => {
    mockThemeService = jasmine.createSpyObj('ThemeService', ['toggleTheme']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockNotificationService = jasmine.createSpyObj('NotificationService', ['getNotifications']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HeaderComponent],  // Use RouterTestingModule to mock routing
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  fit('should toggle theme when toggleTheme is called', () => {
    mockThemeService.toggleTheme.and.callThrough();

    component.toggleTheme();

    expect(mockThemeService.toggleTheme).toHaveBeenCalled();
    console.log('Theme toggled');
  });

  fit('should navigate to the correct route when openitem is called', () => {
    const link = 'home';
    
    component.openitem(link);

    expect(mockRouter.navigate).toHaveBeenCalledWith([`/${link}`]);
  });

  fit('should open the notification dialog when openNotifications is called', () => {
    // Simulate the openNotifications method
    component.openNotifications();

    // Check if the dialog open method was called
    expect(mockDialog.open).toHaveBeenCalled();
    // You can check if it is opened with the right configuration
    expect(mockDialog.open).toHaveBeenCalledWith(jasmine.anything(), jasmine.objectContaining({
      position: { right: '5vw', top: '10vh' },
      width: '400px',
      height: '500px',
      data: { name: 'Notification Panel' }
    }));
  });

  fit('should update theme icon when isDarkMode changes', () => {
    expect(component.isDarkMode).toBe(false);

    component.isDarkMode = !component.isDarkMode;
    fixture.detectChanges();

    const themeToggleButton = fixture.nativeElement.querySelector('.theme-toggle-btn span');
    expect(themeToggleButton.textContent).toBe('🌙'); 
  });
});
