import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Optional: Configure ValidationPipe options
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Strip properties that are not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      // disableErrorMessages: true, // For production, might hide specific error messages
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Films API') // имя приложения
    .addBearerAuth() // возможность авторизации с токеном
    .build();
  const document = SwaggerModule.createDocument(app, config); // генерируем доку
  SwaggerModule.setup('/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
