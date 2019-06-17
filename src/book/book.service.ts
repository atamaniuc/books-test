import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { DeleteWriteOpResultObject } from 'typeorm/browser';
import { BookDto } from './book.dto';
import { Book } from './book.entity';
import { ObjectID } from 'mongodb';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private readonly bookRepository: MongoRepository<Book>) {
  }

  async get(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async getById(id): Promise<Book> {
    return await this.bookRepository.findOne(id);
  }

  async add(dto: BookDto): Promise<Book> {
    const book = this.fromDto(dto);

    return await this.bookRepository.save(book);
  }

  async update(dto: BookDto): Promise<Book> {
    const book = this.fromDto(dto);

    return await this.bookRepository.save(book);
  }

  async remove(id: string): Promise<DeleteWriteOpResultObject> {
    return await this.bookRepository.deleteOne({ _id: new ObjectID(id) });
  }

  fromDto(dto) {
    return Object.assign(new Book(), dto, {
      ...(dto.id ? { id: new ObjectID(dto.id) } : {}),
      authors: dto.authors.map(authorId => new ObjectID(authorId)),
    });
  }
}
