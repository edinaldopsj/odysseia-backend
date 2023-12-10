import { Injectable } from '@nestjs/common';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private sendgridService: SendgridService,
    private mailerService: MailerService,
  ) {}

  async sendAccessCodeMail(email: string, code: string) {
    const mail = {
      to: email,
      subject: 'Seu código de ativação',
      from: 'atendimento@odysseia.com',
      text: 'Olá, seu código de acesso é: ' + code,
      html: `<h1>Olá, seu código de acesso é: '  ${code}</h1>`,
    };

    return await this.sendgridService.send(mail);
  }

  async sendMailGunCodeMail(email: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Ativação - Odysseia',
      html: `<h4>Código de ativação: ${code}</h4>`,
      text: `Código de ativação: ${code}`,
    });
  }
}
