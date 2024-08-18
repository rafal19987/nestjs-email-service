import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CreateMailZodDto } from './dto/create-mail-zod.dto';
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

  async sendEmail(createMailDto: CreateMailZodDto) {
    const { name, surname, email, phone, message } = createMailDto;

    if (!name || !surname || !email || !phone || !message)
      throw new HttpException(
        'Fill in all the details',
        HttpStatus.BAD_REQUEST,
      );

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
      text: 'Wiadomość z Osiakówki text',
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
