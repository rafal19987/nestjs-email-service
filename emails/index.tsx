import * as React from 'react';
import {
  Column,
  Container,
  Head,
  Heading,
  Html,
  Row,
  Section,
  Tailwind,
} from '@react-email/components';

export default function Email({ name, surname, email, phone, message }) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: 'F48E0B',
            },
          },
        },
      }}
    >
      <Html lang="pl">
        <Head>
          <title>Wiadomość z Osiakówki</title>
        </Head>
        <Container className="">
          <Heading className="text-sm lg:text-xl text-center" as="h1">
            Masz nową wiadomość z Osiakówki
          </Heading>
          <Section className="space-y-2">
            <Row className="border-b border-neutral-300">
              <Column className="font-bold text-neutral-400 text-center">
                Imię
              </Column>
            </Row>
            <Row className="border-b border-neutral-300">
              <Column className="text-black text-center">{name}</Column>
            </Row>

            <Row className="border-b border-neutral-300">
              <Column className="font-bold text-neutral-400 text-center">
                Nazwisko
              </Column>
            </Row>
            <Row className="border-b border-neutral-300">
              <Column className="text-black text-center">{surname}</Column>
            </Row>

            <Row className="border-b border-neutral-300">
              <Column className="font-bold text-neutral-400 text-center">
                Email
              </Column>
            </Row>
            <Row className="border-b border-neutral-300">
              <Column className="text-black text-center">{email}</Column>
            </Row>

            <Row className="border-b border-neutral-300">
              <Column className="font-bold text-neutral-400 text-center">
                Numer telefonu
              </Column>
            </Row>
            <Row className="border-b border-neutral-300">
              <Column className="text-black text-center">{phone}</Column>
            </Row>

            <Row className="border-b border-neutral-300">
              <Column className="font-bold text-neutral-400 text-center">
                Wiadomość
              </Column>
            </Row>
            <Row className="border-b border-neutral-300">
              <Column className="text-black text-center">{message}</Column>
            </Row>
          </Section>
        </Container>
      </Html>
    </Tailwind>
  );
}
