import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
})
export class EditBookComponent implements OnInit {
  form!: FormGroup;
  bookId!: number;
  private baseUrl = environment.apiUrl;

  private apiUrl = `${this.baseUrl}/api/books`;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      title: [''],
      author: [''],
      publishDate: [''],
    });
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any>(`${this.apiUrl}/${this.bookId}`, { headers }).subscribe(book => {
    const formattedDate = book.publishDate?.split('T')[0]; 
        this.form.patchValue({
        title: book.title,
        author: book.author,
        publishDate: formattedDate
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.put(`${this.apiUrl}/${this.bookId}`, this.form.value, { headers }).subscribe(() => {
      alert('Book updated successfully!');
      this.router.navigate(['/books']);
    });
  }

  cancel() {
       this.router.navigate(['/books']);
     }
    }