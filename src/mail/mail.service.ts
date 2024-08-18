import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CreateMailZodDto } from './dto/create-mail-zod.dto';

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

    const mailOptions = {
      to: this.configService.getOrThrow('MAIL_TO'),
      subject: `[${this.dateFormatter.format(new Date())}] Nowa wiadomość z Osiakówki`,
      text: 'Wiadomość z Osiakówki text',
      date: this.dateFormatter.format(new Date()),
      html: `<ul>
            <li>
              <p>Imię: ${name}</p>
            </li>
            <li>
              <p>Nazwisko: ${surname}</p>
            </li>
            <li>
              <p>Email: ${email}</p>
            </li>
            <li>
              <p>Numer telefonu: ${phone}</p>
            </li>
            <li>
              <p>Wiadomość: ${message}</p>
            </li>

          </ul>`,
    };

    try {
      await this.mailerService.sendMail(mailOptions);
      return { message: 'Email has been sent correctly' };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
