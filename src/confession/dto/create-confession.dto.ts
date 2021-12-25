import { Type } from 'class-transformer';
import { IsOptional, Length, MinLength } from 'class-validator';
import {
  MAX_SENDER_NAME_LENGTH,
  MIN_CONFESSION_LENGTH,
  MIN_SENDER_NAME_LENGTH,
} from 'src/common/constants';

export class CreateConfessionDto {
  @IsOptional()
  @Type(() => String)
  @Length(MIN_SENDER_NAME_LENGTH, MAX_SENDER_NAME_LENGTH)
  sender: string;

  @Type(() => String)
  @MinLength(MIN_CONFESSION_LENGTH)
  context: string;
}
