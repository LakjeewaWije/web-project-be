import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // register swagger api
  const config = new DocumentBuilder()
    .setTitle('Web Project BE')
    .setDescription('Web Project API description')
    .setVersion('1.0')
    .addTag('#Web Project BE')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');

  console.log('Appp running on .... ', port);
  await app.listen(port ?? 3200);
}
bootstrap();
