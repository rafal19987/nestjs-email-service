import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import validator from 'validator';

export const createMailSechema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Imię jest za krótkie. Wprowadź co najmniej 3 litery',
    })
    .max(20, { message: 'Imię jest za długie' })
    .trim()
    .regex(new RegExp('^[a-zA-Z]+$'), 'Imię może zawierać tylko litery')
    .refine((val: string) => val !== ' ', {
      message: 'Imię nie może zawierać pustych znaków',
    }),
  surname: z
    .string()
    .min(3, {
      message: 'Nazwisko jest za krótkie. Wprowadź co najmniej 3 litery',
    })
    .max(20, { message: 'Nazwisko jest za długie' })
    .trim()
    .regex(new RegExp('^[a-zA-Z]+$'), 'Nazwisko może zawierać tylko litery'),
  email: z
    .string()
    .trim()
    .email('Wprowadź poprawny email')
    .refine(validator.isEmail, 'Podaj poprawny adres email'),
  phone: z
    .string()
    .length(9, { message: 'Numer telefonu musi mieć 9 znaków.' })
    .trim()
    .refine(validator.isMobilePhone, 'Podaj poprawny numer telefonu'),
  message: z
    .string()
    .min(10, {
      message: 'Wiadomość zbyt krótka. Wprowadź przynajmniej 10 znaków',
    })
    .max(120, { message: 'Wiadomość nie może być dłóższa niż 120 znaków.' }),
});

export class CreateMailDto extends createZodDto(createMailSechema) {}
