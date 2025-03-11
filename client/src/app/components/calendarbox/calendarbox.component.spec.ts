import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarboxComponent } from './calendarbox.component';

describe('CalendarboxComponent', () => {
  let component: CalendarboxComponent;
  let fixture: ComponentFixture<CalendarboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
