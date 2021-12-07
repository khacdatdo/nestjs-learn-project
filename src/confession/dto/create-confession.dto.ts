import { Type } from 'class-transformer';
import { Length, Min } from 'class-validator';

export class CreateConfessionDto {
  @Type(() => String)
  @Length(5, 200)
  sender: string;

  @Type(() => String)
  @Min(100)
  context: string;
}
