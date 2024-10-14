import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        port: Number(process.env.USERS_MS_PORT),
        host: process.env.USERS_MS_HOST,
      }
    },
  );
  const logger = new Logger('users-ms');
  await app.listen();
  logger.log(`Users-ms is running on ${process.env.USERS_MS_HOST}:${process.env.USERS_MS_PORT}`);
}
bootstrap();
