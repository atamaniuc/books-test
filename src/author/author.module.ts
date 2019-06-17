import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from '../book/book.entity';
import { Author } from './author.entity';

import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book])],
  providers: [AuthorService],
  controllers: [AuthorController],
})

export class AuthorModule {}
