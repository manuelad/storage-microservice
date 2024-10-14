import { NestFactory } from '@nestjs/core';
import { ImagesMsModule } from './images-ms.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ImagesMsModule,
    {
      transport: Transport.TCP,
      options: {
        port: Number(process.env.IMAGES_MS_PORT),
        host: process.env.IMAGES_MS_HOST
      }
    },
  );
  const logger = new Logger('image-ms')
  await app.listen();
  logger.log(`Image-ms is running on ${process.env.IMAGES_MS_HOST}:${process.env.IMAGES_MS_PORT}`)
}
bootstrap();
