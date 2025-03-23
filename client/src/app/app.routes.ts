import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/signin/signin.component').then((m) => m.SigninComponent),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'student',
        loadComponent: () =>
          import('./components/data-table/data-table.component').then(
            (m) => m.DataTableComponent
          ),
      },
      {
        path: 'preferences',
        loadComponent: () =>
          import('./pages/preferences/preferences.component').then(
            (m) => m.PreferencesComponent
          ),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./components/calendarbox/calendarbox.component').then(
            (m) => m.CalendarboxComponent
          ),
      },
    ],
  },
];
