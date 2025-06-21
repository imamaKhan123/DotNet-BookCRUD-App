import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Favorite } from '../models/favorite.model'; // or wherever
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private baseUrl = environment.apiUrl;

  private apiUrl = `${this.baseUrl}/api/favorites`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  addToFavorites(bookId: number): Observable<any> {
    return this.http.post(this.apiUrl, { bookId }, { headers: this.getAuthHeaders() });
  }

  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  removeFromFavorites(bookId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bookId}`, { headers: this.getAuthHeaders() });
  }
}
