import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true, // Add this if using standalone components
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']  
})
export class SignupComponent {
  name = '';
  phone = '';
  email = '';
  password = '';

  message = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.message = '';

    if (!this.name || !this.phone || !this.email || !this.password) {
      this.error = 'Please fill all fields.';
      return;
    }

    this.authService.register({ name: this.name, phone: this.phone, email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          this.message = res.message;

          // Clear form fields
          this.name = '';
          this.phone = '';
          this.email = '';
          this.password = '';

          // Navigate to login page after a short delay (optional)
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (err) => {
          this.error = 'Registration failed. Please try again.';
          console.error(err);
        }
      });
  }
}
