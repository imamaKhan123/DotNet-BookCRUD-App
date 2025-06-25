import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-quotes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-quotes.component.html',
  styleUrl: './edit-quotes.component.css'
})
export class EditQuotesComponent {
  form!: FormGroup;
  quoteId!: number;
  private baseUrl = environment.apiUrl;

  private apiUrl = `${this.baseUrl}/api/quotes`;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.quoteId = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      text: [''],
      author: [''],
    });
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any>(`${this.apiUrl}/${this.quoteId}`, { headers }).subscribe(quote => {

        this.form.patchValue({
          text: quote.text,
        author: quote.author
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.put(`${this.apiUrl}/${this.quoteId}`, this.form.value, { headers }).subscribe(() => {
      alert('Quote updated successfully!');
      this.router.navigate(['/quotes']);
    });
  }

  cancel() {
       this.router.navigate(['/quotes']);
     }
    }