import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthorDto } from './author.dto';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import { ApiUseTags } from '@nestjs/swagger';
import { DeleteWriteOpResultObject } from 'typeorm';

@Controller('author')
@ApiUseTags('author')
@UsePipes(new ValidationPipe())
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {
  }

  @Get()
  get(): Promise<Author[]> {
    return this.authorService.get();
  }

  @Get('books')
  getAuthorsWithBooks() {
    return this.authorService.getWithBooks();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<any> {
    return this.authorService.getById(id);
  }

  @Post()
  add(@Body() dto: AuthorDto): Promise<Author> {
    return this.authorService.add(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: AuthorDto): Promise<Author> | any {
    return this.authorService.update(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteWriteOpResultObject> {
    return this.authorService.remove(id);
  }
}
