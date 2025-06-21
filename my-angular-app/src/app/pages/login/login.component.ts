import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private authService: AuthService, public router: Router) {}

  onSubmit() {
    this.error = '';
    this.message = '';

    if (!this.email || !this.password) {
      this.error = 'Email and password are required.';
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.message = res.message || 'Login successful!';
        localStorage.setItem('token', res.token); // adjust this depending on actual API response
        this.router.navigate(['/books']); // or redirect to dashboard
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }
}
