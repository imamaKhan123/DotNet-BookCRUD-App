
import { Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { MyQuotesComponent } from './pages/my-quotes/my-quotes.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component'; // You need to import SignupComponent too
import { authGuard } from './auth.guard';
import { guestGuard } from './guest.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public routes 
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard] 
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent),
    canActivate: [guestGuard]
  },
  {
    path: '',
    component: DashboardComponent, 
    children: [
      { path: 'books', component: BookListComponent, canActivate: [authGuard] },
      { path: 'books/add', component: AddBookComponent, canActivate: [authGuard] },
      { path: 'books/edit/:id', component: EditBookComponent, canActivate: [authGuard] },
      { path: 'favorites', component: MyQuotesComponent, canActivate: [authGuard] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },  
  { path: '**', redirectTo: '' }, // fallback route
];
