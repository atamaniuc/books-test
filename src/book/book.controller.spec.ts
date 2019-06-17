import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookDto } from './book.dto';
import { Book } from './book.entity';
import { BookService } from './book.service';

jest.mock('./book.service');

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

describe('Books Controller', () => {
  let controller: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    controller = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get Books', () => {
    it('should return books', async () => {
      jest.spyOn(bookService, 'get').mockResolvedValue(booksMock);

      const books = await controller.get();

      expect(bookService.get).toHaveBeenCalled();
      expect(books).toEqual(booksMock);
    });
  });

  describe('Get Book by id', () => {
    it('should return book by id', async () => {
      const id = '5cf40ac23a499b14485135ec';

      jest.spyOn(bookService, 'getById').mockResolvedValue(bookMock);

      const book = await controller.getById(id);

      expect(bookService.getById).toHaveBeenCalledWith(id);
      expect(book).toEqual(bookMock);
    });
  });

  describe('Add Book', () => {
    it('should add the new book', async () => {
      const dto = Object.assign(new BookDto(), {
        title: 'book',
        authors: ['5cf3ccddccb5723b20eb6f5b'],
        iban: 'klasfjhflkashjflkashfjklas',
      });

      jest.spyOn(bookService, 'add').mockResolvedValue(bookMock);

      const book = await controller.add(dto);

      expect(bookService.add).toHaveBeenCalledWith(dto);
      expect(book).toEqual(bookMock);
    });
  });

  describe('Update Book', () => {
    it('should update existing book', async () => {
      const dto = Object.assign(new BookDto(), {
        id: '5cf40ac23a499b14485135ec',
        title: 'book',
        authors: ['5cf3ccddccb5723b20eb6f5b'],
        iban: 'klasfjhflkashjflkashfjklas',
      });

      await controller.update(dto.id, dto);
      expect(bookService.update).toHaveBeenCalledWith(dto);
    });
  });

  describe('Remove Book', () => {
    it('should remove existing book', async () => {
      const id = '5cf40ac23a499b14485135ec';

      await controller.remove(id);
      expect(bookService.remove).toHaveBeenCalledWith(id);
    });
  });
});
