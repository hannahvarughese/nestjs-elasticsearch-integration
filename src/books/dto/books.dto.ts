import { PartialType } from '@nestjs/mapped-types';
import { IndicesCreateRequest } from '@elastic/elasticsearch/lib/api/types';

export class CreateBookDto {
  name: string;
  category: string;
  price: number;
}
export type ElasticsearchMapping = IndicesCreateRequest['mappings'];

export class UpdateBookDto extends PartialType(CreateBookDto) {}
