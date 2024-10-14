import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { IMAGE_SERVICE } from './config/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: IMAGE_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.IMAGES_MS_HOST,
          port: Number(process.env.IMAGES_MS_PORT)
        }
      }
    ]),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
