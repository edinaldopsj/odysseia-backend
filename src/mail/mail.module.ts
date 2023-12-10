import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
