import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
