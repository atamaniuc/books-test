import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { mongoRepositoryMockFactoryProvider } from '../testing/repository-factory.mock';
import { BookDto } from './book.dto';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { ObjectID } from 'mongodb';

const bookMock = Object.assign(new Book(), {
  id: '5cf40ac23a499b14485135ec',
  title: 'book',
  authors: ['5cf3ccddccb5723b20eb6f5b'],
  iban: 'klasfjhflkashjflkashfjklas',
  createdAt: '2019-06-02T17:43:30.139+00:00',
  updatedAt: '2019-06-02T17:43:30.139+00:00',
});
const booksMock = [
  bookMock,
  bookMock,
];

describe('BookService', () => {
  let service: BookService;
  let repo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        mongoRepositoryMockFactoryProvider(Book),
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repo = module.get<MongoRepository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get books', () => {
    it('should get all books from the database', async () => {
      repo.find.mockReturnValue(booksMock);

      const books = await service.get();

      expect(repo.find).toHaveBeenCalled();
      expect(books).toEqual(booksMock);
    });
  });

  describe('Get books by id', () => {
    it('should get book by id from the database', async () => {
      const id = '5cf40ac23a499b14485135ec';

      repo.findOne.mockReturnValue(bookMock);
      const book = await service.getById(id);

      expect(repo.findOne).toHaveBeenCalledWith(id);
      expect(book).toEqual(bookMock);
    });
  });

  describe('Create book', () => {
    it('should create a new book in the database', async () => {
      const params = Object.assign(new BookDto(), {
        title: 'book',
        authors: ['5cf3ccddccb5723b20eb6f5b'],
        iban: 'klasfjhflkashjflkashfjklas',
      });

      repo.save.mockReturnValue(bookMock);

      const newBook = await service.add(params);

      const book = service.fromDto(params);

      expect(repo.save).toHaveBeenCalledWith(book);
      expect(newBook).toEqual(bookMock);
    });
  });

  describe('Update book', () => {
    it('should update existing book in the database', async () => {
      const params = Object.assign(new BookDto(), {
        id: '5cf40ac23a499b14485135ec',
        title: 'book',
        authors: ['5cf3ccddccb5723b20eb6f5b'],
        iban: 'klasfjhflkashjflkashfjklas',
      });

      repo.save.mockReturnValue(bookMock);

      const updatedBook = await service.update(params);

      const book = service.fromDto(params);

      expect(repo.save).toHaveBeenCalledWith(book);
      expect(updatedBook).toEqual(bookMock);
    });
  });

  describe('Remove book', () => {
    it('should remove the book from the database', async () => {
      const id = '5cf40ac23a499b14485135ec';

      await service.remove(id);

      expect(repo.deleteOne).toHaveBeenCalledWith({
        _id: new ObjectID(id),
      });
    });
  });
});
