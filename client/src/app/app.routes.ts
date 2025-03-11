import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SigninComponent } from './pages/signin/signin.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { AppComponent } from './app.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { CalendarboxComponent } from './components/calendarbox/calendarbox.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'signin', component: SigninComponent },
  {
    path: 'admin',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'student', component: DataTableComponent },
      { path: 'preferences', component: PreferencesComponent },
      { path: 'calendar', component: CalendarboxComponent },
    ]
  }
  // { path: 'student', component: DataTableComponent, canActivateChild: [AuthGuard] },
  // { path: 'preferences', component: PreferencesComponent },
  // { path: 'calendar', component: CalendarboxComponent },
];
