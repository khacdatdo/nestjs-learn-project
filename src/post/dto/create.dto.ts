import { IsArray, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  facebookPostId: string;

  @IsArray()
  confessions: number[];
}
