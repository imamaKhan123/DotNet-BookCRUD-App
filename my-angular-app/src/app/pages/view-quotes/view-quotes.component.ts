import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common'; // 👈 NgIf imported explicitly
import { Quote } from '../../models/quotes.model';
import { QuoteService } from '../../services/quotes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-quotes',
  standalone: true,
  imports: [CommonModule, NgIf], // 👈 NgIf added here
  templateUrl: './view-quotes.component.html',
  styleUrls: ['./view-quotes.component.css']
})
export class ViewQuotesComponent implements OnInit {
  quotes: Quote[] = [];
  currentPageQuotes: number = 1;
  pageSizeQuotes: number = 5;
  
  constructor(private quoteService: QuoteService,private router: Router) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
 
    this.quoteService.getQuotes().subscribe((data) => {
      this.quotes = data;
      // console.log("quotes");
    });
  }

  addNewQuote(): void {
    this.router.navigate(['/quotes/add']);
  }

  editQuote(quote: Quote): void {
    this.router.navigate(['/quotes/edit', quote.id]);
  }

  deleteQuote(id: any): void {
    if (confirm('Are you sure you want to delete this quote?')) {
      this.quoteService.deleteQuote(id).subscribe(() => {
        this.loadQuotes(); // reload after deletion
      });
    }
  }

paginatedQuotes(): Quote[] {
  const startIndex = (this.currentPageQuotes - 1) * this.pageSizeQuotes;
  return this.quotes.slice(startIndex, startIndex + this.pageSizeQuotes);
}

nextQuotePage() {
  if (this.currentPageQuotes * this.pageSizeQuotes < this.quotes.length) {
    this.currentPageQuotes++;
  }
}

prevQuotePage() {
  if (this.currentPageQuotes > 1) {
    this.currentPageQuotes--;
  }
}
}
