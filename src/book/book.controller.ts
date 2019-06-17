import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeleteWriteOpResultObject } from 'typeorm';

import { BookDto } from './book.dto';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('book')
@ApiUseTags('book')
@UsePipes(new ValidationPipe())
export class BookController {
  constructor(private readonly bookService: BookService) {
  }

  @Get()
  get(): Promise<Book[]> {
    return this.bookService.get();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Book> {
    return this.bookService.getById(id);
  }

  @Post()
  add(@Body() dto: BookDto): Promise<Book> {
    return this.bookService.add(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: BookDto): Promise<Book> {
    return this.bookService.update(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteWriteOpResultObject> {
    return this.bookService.remove(id);
  }
}
