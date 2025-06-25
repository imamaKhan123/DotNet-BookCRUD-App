import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Quote } from '../models/quotes.model';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/api/quotes`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // Add a new quote (text + author only)
  addQuote(quote: Partial<Quote>): Observable<Quote> {
    return this.http.post<Quote>(this.apiUrl, quote, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get all quotes
  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Update quote
  updateQuote(id: number, quote: Partial<Quote>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, quote, {
      headers: this.getAuthHeaders(),
    });
  }

  // Delete quote
  deleteQuote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
