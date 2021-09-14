import { IsString, IsInt } from 'class-validator';

export class CreateCatForm {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
