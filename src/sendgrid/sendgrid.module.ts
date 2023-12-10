import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [SendgridService],
  exports: [SendgridService],
})
export class SendgridModule {}
