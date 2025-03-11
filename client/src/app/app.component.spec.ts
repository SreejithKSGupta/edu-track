import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ThemeService } from './services/theme.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let themeServiceSpy: ThemeService;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    themeServiceSpy = jasmine.createSpyObj('ThemeService', ['initializeTheme']);

    activatedRouteStub = {
      params: of({ id: '123' }), 
      queryParams: of({ mode: 'edit' }) 
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientModule], 
      providers: [
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }, 
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call initializeTheme on ThemeService', () => {
    TestBed.createComponent(AppComponent); 
    expect(themeServiceSpy.initializeTheme).toHaveBeenCalled();
  });
});