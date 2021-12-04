import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator'

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsNumber()
  @IsPositive()
  age: number
  @IsString()
  @IsNotEmpty()
  species: string
}
