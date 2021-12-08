import { IsNotEmpty } from 'class-validator';

export class CreateSettingDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  isMultiline: boolean;

  @IsNotEmpty()
  isRequired: boolean;
}
