
import { Book } from './book.model';

export interface Favorite {
  id: number;
  bookId: number;
  userId: number;
  book: Book;
  user?: any; 
}
