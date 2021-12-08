import { Type } from 'class-transformer';
import { IsOptional, Length, MinLength } from 'class-validator';

export class CreateConfessionDto {
  @IsOptional()
  @Type(() => String)
  @Length(5, 200)
  sender: string;

  @Type(() => String)
  @MinLength(100)
  context: string;
}
