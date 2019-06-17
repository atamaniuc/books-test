import { Book } from '../book/book.entity';
import { AuthorDto } from './author.dto';

export class AuthorWithBooksDto extends AuthorDto {
  books: Book[];
}
