import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarboxComponent } from './calendarbox.component';
import { CalendarUtils } from 'angular-calendar';  // Import CalendarUtils
import { of } from 'rxjs';  // For mocking observables (if needed)

describe('CalendarboxComponent', () => {
  let component: CalendarboxComponent;
  let fixture: ComponentFixture<CalendarboxComponent>;
  
  // Mock CalendarUtils if needed
  const mockCalendarUtils = {
    // Mock the required methods of CalendarUtils if needed
    // For example:
    getMonthNames: () => of(['January', 'February', 'March']),
    getDaysInMonth: () => 30
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarboxComponent],
      providers: [
        { provide: CalendarUtils, useValue: mockCalendarUtils }  // Provide the mocked CalendarUtils
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
