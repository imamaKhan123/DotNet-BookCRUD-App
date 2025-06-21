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
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { BookService } from '../../services/book.service';
// @Component({
//   selector: 'app-edit-book',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './edit-book.component.html',
// })
// export class EditBookComponent implements OnInit {
//   form!: FormGroup;
//   bookId!: number;

//   constructor(
//     private route: ActivatedRoute,
//     private fb: FormBuilder,
//     private bookService: BookService,
//     public router: Router
//   ) {}

//   ngOnInit(): void {
//     this.bookId = +this.route.snapshot.paramMap.get('id')!;
  
//     this.form = this.fb.group({
//       title: [''],
//       author: [''],
//       publishDate: [''],
//     });
  
//     this.bookService.getBookById(this.bookId).subscribe({
//       next: (book) => {
//         let formattedDate = '';
  
//         if (book.publishDate) {
//           // If it's a string
//           if (typeof book.publishDate === 'string') {
//             formattedDate = book.publishDate.split('T')[0];
//           }
//           // If it's a Date object
//           else if (book.publishDate instanceof Date) {
//             formattedDate = book.publishDate.toISOString().split('T')[0];
//           }
//         }
  
//         this.form.patchValue({
//           title: book.title,
//           author: book.author,
//           publishDate: formattedDate,
//         });
//       },
//       error: (err) => {
//         console.error('Error loading book:', err);
//         alert('Failed to load book data.');
//         this.router.navigate(['/books']);
//       }
//     });
//   }
  
    
//   get f() {
//     return this.form.controls;
//   }

//   cancel() {
//     this.router.navigate(['/books']);
//   }

//   onSubmit(): void {
//     if (this.form.invalid) {
//       return;
//     }

//     this.bookService.updateBook(this.bookId, this.form.value).subscribe({
//       next: () => {
//         alert('Book updated successfully!');
//         this.router.navigate(['/books']);
//       },
//       error: (err) => {
//         console.error('Error updating book:', err);
//         alert('Failed to update book.');
//       }
//     });
//   }
// }
