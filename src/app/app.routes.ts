import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SigninComponent } from './pages/signin/signin.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signin', component: SigninComponent },
];
