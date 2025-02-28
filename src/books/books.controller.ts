import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import {
  CreateBookDto,
  ElasticsearchMapping,
  UpdateBookDto,
} from './dto/books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post(':index/create')
  async createIndex(
    @Param('index') index: string,
    @Body() mapping: ElasticsearchMapping,
  ) {
    return this.booksService.createIndex(index, mapping);
  }

  @Post(':index/add')
  async addDocument(
    @Param('index') index: string,
    @Body() book: CreateBookDto,
  ) {
    return this.booksService.addBook(index, book);
  }

  @Post(':index/bulk-insert')
  async bulkInsert(
    @Param('index') index: string,
    @Body() books: CreateBookDto[],
  ) {
    return this.booksService.bulkInsertBooks(index, books);
  }

  @Get(':index/search')
  async search(@Param('index') index: string, @Body() query: any) {
    return this.booksService.searchBooks(index, query);
  }

  @Put(':index/update/:id')
  async updateDocument(
    @Param('index') index: string,
    @Param('id') id: string,
    @Body() updateBook: UpdateBookDto,
  ) {
    return this.booksService.updateBook(index, id, updateBook);
  }

  @Delete(':index/delete/:id')
  async deleteDocument(@Param('index') index: string, @Param('id') id: string) {
    return this.booksService.deleteBook(index, id);
  }
}
