import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
