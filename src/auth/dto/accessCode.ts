import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthAccessCodeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
