import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('app-main')
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Api Images Upload')
    .setDescription('App for upload images to Firebase and save information postgresql')
    .setVersion('1.0')
    .addTag('Images')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  app.setGlobalPrefix('api')
  const PORT = Number(process.env.APP_MAIN_PORT);
  await app.listen(PORT);
  logger.log(`Application is running on: ${PORT}`);
}
bootstrap();
