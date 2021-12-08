import { IsOptional } from 'class-validator';

export class FilterDto {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  search: string;
}
