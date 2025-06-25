import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-create-quotes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-quotes.component.html',
  styleUrl: './create-quotes.component.css'
})
export class CreateQuotesComponent {
  form!: FormGroup;
  private baseUrl = environment.apiUrl;

  private apiUrl = `${this.baseUrl}/api/quotes`;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      quote: ['', Validators.required],
      author:['', Validators.required],
     });
  }
  cancel() {
    this.router.navigate(['/quotes']);
  }
  onSubmit() {
    const token = localStorage.getItem('token') || '';
    if (!token) {
      alert('You are not logged in. Please login first.');
      return;
    }
    
    if (this.form.invalid) return;
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    
    const newQuote = {
      text: this.form.value.quote,
      author: this.form.value.author,
    };
  
    this.http.post(this.apiUrl, newQuote, { headers }).subscribe({
      next: () => {
        alert('Quote added successfully!');
        this.router.navigate(['/quotes']);
      },
      error: (err) => {
        console.error('Error adding Quote:', err);
        alert('Failed to add quote');
      }
    });
  }
  
}
