import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import * as process from 'process';
import { ResponseInterceptor } from './common/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  patchNestJsSwagger();

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Send Emails with Nestjs')
    .setDescription('Sending Email Nest.js Service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api/v1');
  const PORT = process.env.PORT_SERVER || 4000;
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
