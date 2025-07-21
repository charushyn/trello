import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(data: { mail_to: string; link: string }) {
    try {
      await this.mailerService.sendMail({
        to: data.mail_to,
        subject: 'Your link to login', // Subject line
        text: '',
        html: '<a href={data.link}>Magic button!</a>',
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}
