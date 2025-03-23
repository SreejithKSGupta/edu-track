import { HeaderComponent } from './header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { Dialog } from '@angular/cdk/dialog';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification.service';
import { AdminserviceService } from '../../services/adminservice.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockThemeService: ThemeService;
  let mockRouter: Router;
  let mockDialog: Dialog;
  let mockNotificationService: NotificationService;
  let mockAdminservice: AdminserviceService;

  beforeEach(async () => {
    mockThemeService = jasmine.createSpyObj('ThemeService', ['toggleTheme']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockNotificationService = jasmine.createSpyObj('NotificationService', ['getNotifications', 'unreadCount']);
    mockAdminservice = jasmine.createSpyObj('AdminserviceService', ['isAuthenticated', 'logout']);

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        MatIconModule,
        MatButtonModule,
        MatBadgeModule
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

  

  
});
