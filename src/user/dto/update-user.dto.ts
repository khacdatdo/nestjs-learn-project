import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
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
