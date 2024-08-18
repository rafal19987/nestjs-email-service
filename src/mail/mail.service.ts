import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CreateMailDto } from './dto/create-mail.dto';
import Email from 'emails';
import { render } from '@react-email/components';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  private dateFormatter = new Intl.DateTimeFormat('pl', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  async sendEmail(createMailDto: CreateMailDto) {
    const { name, surname, email, phone, message } = createMailDto;

    const emailHtml = render(
      Email({
        name,
        surname,
        email,
        phone,
        message,
      }),
    );

    const mailOptions = {
      to: this.configService.getOrThrow('MAIL_TO'),
      subject: `[${this.dateFormatter.format(new Date())}] Nowa wiadomość z Osiakówki`,
      text: 'Wiadomość z Osiakówki',
      date: this.dateFormatter.format(new Date()),
      html: emailHtml,
    };

    try {
      await this.mailerService.sendMail(mailOptions);
      return { message: 'Email has been sent correctly' };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
