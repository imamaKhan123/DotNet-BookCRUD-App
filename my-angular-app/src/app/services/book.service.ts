import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = environment.apiUrl;

  private apiUrl = `${this.baseUrl}/api/books`;

  constructor(private http: HttpClient) {}

  private getToken(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getBooks(): Observable<Book[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Book[]>(this.apiUrl, { headers });
  }

  getBookById(id: number): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.get<Book>(`${this.apiUrl}/${id}`, { headers });
  }

  updateBook(id: number, bookData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, bookData, { headers });
  }

  deleteBook(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
