import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  CreateBookDto,
  ElasticsearchMapping,
  UpdateBookDto,
} from './dto/books.dto';

@Injectable()
export class BooksService {
  constructor(private readonly esService: ElasticsearchService) {}

  onModuleInit() {
    console.log('Elasticsearch Connected');
  }

  async createIndex(index: string, mapping: ElasticsearchMapping) {
    const exists = await this.esService.indices.exists({ index });

    if (!exists) {
      await this.esService.indices.create({
        index,
        body: {
          mappings: mapping, // Accept dynamic mapping
        },
      });
      return { message: `Index "${index}" created successfully` };
    }
    return { message: `Index "${index}" already exists` };
  }

  async addBook(index: string, book: CreateBookDto) {
    const response = await this.esService.index({
      index,
      body: book,
      refresh: 'true',
    });
    return { id: response._id, result: response.result };
  }

  async bulkInsertBooks(index: string, books: CreateBookDto[]) {
    const bulkOperations = books.flatMap((book) => [
      { index: { _index: index } },
      book,
    ]);

    const response = await this.esService.bulk({
      refresh: true,
      body: bulkOperations,
    });

    if (response.errors) {
      throw new Error('Bulk insert encountered errors');
    }
    return { message: 'Bulk insert successful', count: books.length };
  }

  async searchBooks(index: string, query: object) {
    const response = await this.esService.search({
      index,
      body: { query },
    });
    return response.hits.hits;
  }

  async updateBook(index: string, id: string, updateBook: UpdateBookDto) {
    const response = await this.esService.update({
      index,
      id,
      body: { doc: updateBook },
      refresh: 'true',
    });
    return { id: response._id, result: response.result };
  }

  async deleteBook(index: string, id: string) {
    const response = await this.esService.delete({
      index,
      id,
      refresh: 'true',
    });
    return { id: response._id, result: response.result };
  }
}
