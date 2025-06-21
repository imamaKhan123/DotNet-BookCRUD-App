import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private router: Router,
    private bookService: BookService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  
  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (error) => {
        
        console.error('Error loading books:');
       // this.safeAlert('Failed to load books');
      }
    });
  }

  editBook(book: Book): void {
    this.router.navigate(['/books/edit', book.id]);
  }

  addFavorite(bookId: number): void {
    this.favoriteService.addToFavorites(bookId).subscribe({
      next: () => alert('Book added to favorites!'),
      error: (err) => {
        console.error('Error adding favorite:', err);
        alert('Failed to add to favorites.');
      }
    });
  }

  deleteBook(book: Book): void {
    if (!confirm(`Are you sure you want to delete "${book.title}"?`)) return;

    this.bookService.deleteBook(book.id).subscribe({
      next: () => {
        this.books = this.books.filter(b => b.id !== book.id);
        alert('Book deleted successfully!');
      },
      error: (error) => {
        console.error('Error deleting book:', error);
        alert('Failed to delete book');
      }
    });
  }

  addNewBook(): void {
    this.router.navigate(['/books/add']);
  }
}
