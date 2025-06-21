import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title = 'BOOK CRUD APP';
  isDarkMode = false;
  username: string | null = null;
  isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.getUsernameFromToken();

      const savedMode = localStorage.getItem('darkMode');
      this.isDarkMode = savedMode === 'true';
      this.updateBodyClass();
    }
  }

  getUsernameFromToken() {
    if (!this.isBrowser) return;

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.username = decoded.unique_name || 'User';
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }

  toggleDarkMode() {
    if (!this.isBrowser) return;

    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateBodyClass();
  }

  private updateBodyClass() {
    if (!this.isBrowser) return;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  navigateToBooks() {
    this.router.navigate(['/books']);
  }

  navigateToFavorites() {
    this.router.navigate(['/favorites']);
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}
