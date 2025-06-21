import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { Favorite } from '../../models/favorite.model';

@Component({
  selector: 'app-my-quotes',
  imports: [CommonModule],
  templateUrl: './my-quotes.component.html',
  styleUrl: './my-quotes.component.css'
})
export class MyQuotesComponent {
  favorites: Favorite[] = [];
  currentPage = 1;
  pageSize = 5;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (favorites: Favorite[]) => {
        this.favorites = favorites;
       // console.log(this.favorites);
      },
      error: (err) => {
        console.error('Failed to load favorites:', err);
      }
    });
  }
  

  paginatedBooks(): Book[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.favorites.slice(start, start + this.pageSize).map(fav => fav.book);
  }

  nextPage(): void {
    if ((this.currentPage * this.pageSize) < this.favorites.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  remove(favoriteId: number): void {
    this.favoriteService.removeFromFavorites(favoriteId).subscribe(() => {
      this.loadFavorites();
    });
  }
}
