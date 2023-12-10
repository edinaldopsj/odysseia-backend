import { HttpCode, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mail: MailService,
  ) {}

  async sendLoginCodeMail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      await this.prisma.user.create({
        data: {
          email,
        },
      });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        code,
      },
    });

    await this.mail.sendMailGunCodeMail(email, code);

    return 'OK';
  }

  @HttpCode(200)
  async validateLoginCode(email: string, code: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error('USER_NOT_FOUND');
    if (code !== user.code) throw new Error('INVALID_CODE');

    const payload = {
      sub: user.id,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: this.config.get('JWT_SECRET'),
    });

    return { token };
  }
}
