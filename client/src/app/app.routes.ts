import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'home', component: AppComponent },

  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    canActivate: [AuthGuard] // Protect dashboard
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/signin/signin.component')
      .then(m => m.SigninComponent)
  },
  {
    path: 'admin',
    canActivateChild: [AuthGuard], 
    children: [
      {
        path: 'student',
        loadComponent: () => import('./components/data-table/data-table.component')
          .then(m => m.DataTableComponent)
      },
      {
        path: 'preferences',
        loadComponent: () => import('./pages/preferences/preferences.component')
          .then(m => m.PreferencesComponent)
      },
      {
        path: 'calendar',
        loadComponent: () => import('./components/calendarbox/calendarbox.component')
          .then(m => m.CalendarboxComponent)
      }
    ]
  }
];
