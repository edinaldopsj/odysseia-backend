import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthAccessCodeDto, AuthEmailDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('get-access-code')
  getAccessCode(@Body() dto: AuthEmailDto) {
    return this.authService.sendLoginCodeMail(dto.email);
  }

  @Post('validate-access-code')
  validateAccessCode(@Body() dto: AuthAccessCodeDto) {
    return this.authService.validateLoginCode(dto.email, dto.code);
  }
}
