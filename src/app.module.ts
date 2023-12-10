import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { TripModule } from './trip/trip.module';
import { DiaryModule } from './diary/diary.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MailModule,
    PrismaModule,
    SendgridModule,
    TripModule,
    DiaryModule,
    CloudinaryModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        secure: false,
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        ignoreTLS: true,
      },
      defaults: {
        from: process.env.DEFAULT_EMAIL_SENDER,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
