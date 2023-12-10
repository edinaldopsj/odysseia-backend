import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateDiaryDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}
