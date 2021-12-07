import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  displayName: string;

  @IsOptional()
  @IsString()
  quote: string;

  @IsOptional()
  @IsUrl()
  avtUrl: string;

  @IsOptional()
  @Type(() => String)
  facebookId: string;

  @IsOptional()
  @Type(() => String)
  pageUserId: string;
}
