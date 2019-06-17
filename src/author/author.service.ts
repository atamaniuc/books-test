import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MongoRepository } from 'typeorm';
import { Book } from '../book/book.entity';
import { AuthorWithBooksDto } from './author-with-books.dto';
import { AuthorDto } from './author.dto';
import { Author } from './author.entity';
import { ObjectID } from 'mongodb';
import { DeleteWriteOpResultObject } from 'typeorm/browser';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: MongoRepository<Author>,
    @InjectRepository(Book)
    private readonly bookRepository: MongoRepository<Book>,
  ) {
  }

  async get(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async getWithBooks(): Promise<AuthorWithBooksDto[]> {
    const authors = await this.authorRepository.find();
    const ids: ObjectID[] = authors.map(author => author.id);
    const books = await this.bookRepository.find({ authors: { $in: ids } } as FindManyOptions<any> | Partial<any>);

    return authors.map((author: any) => {
      author.books = books.filter(book => book.authors.some(a => a.equals(author.id)));

      return author;
    });
  }

  async getById(id): Promise<any> {
    const author = await this.authorRepository.findOne(id);
    const books = await this.bookRepository.find({ author: author.id } as FindManyOptions<any> | Partial<any>);

    return {
      ...author,
      books,
    };
  }

  async getByIds(ids: string[]): Promise<Author[]> {
    return await this.authorRepository.findByIds(ids);
  }

  async add(dto: AuthorDto): Promise<Author> {
    const author = Object.assign(new Author(), dto);

    return await this.authorRepository.save(author);
  }

  async update(dto: AuthorDto): Promise<Author> {
    const author = Object.assign(new Author(), dto, {
      id: new ObjectID(dto.id),
    });

    return await this.authorRepository.save(author);
  }

  async remove(id: string): Promise<DeleteWriteOpResultObject> {
    return await this.authorRepository.deleteOne({ _id: new ObjectID(id) });
  }
}
