import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  form!: FormGroup;
  private baseUrl = environment.apiUrl;

  private apiUrl = `${this.baseUrl}/api/books`;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishDate: ['', Validators.required]
    });
  }
  cancel() {
    this.router.navigate(['/books']);
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
  
    const publishDateISO = new Date(this.form.value.publishDate).toISOString();
  
    const newBook = {
      title: this.form.value.title,
      author: this.form.value.author,
      publishDate: publishDateISO
    };
  
    this.http.post(this.apiUrl, newBook, { headers }).subscribe({
      next: () => {
        alert('Book added successfully!');
        this.router.navigate(['/books']);
      },
      error: (err) => {
        console.error('Error adding book:', err);
        alert('Failed to add book');
      }
    });
  }
  
}
