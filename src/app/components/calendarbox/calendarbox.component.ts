import { Component } from '@angular/core';
import { CalendarModule, CalendarView, CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-calendarbox',
  imports: [CalendarModule],
  templateUrl: './calendarbox.component.html',
  styleUrl: './calendarbox.component.scss'
})
export class CalendarboxComponent {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  events: CalendarEvent[] = [];
}
