import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDiaryDto {
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
