import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from '../config/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/contanst';

@Module({
  controllers: [AuthController],
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_MS_HOST,
          port: Number(process.env.USERS_MS_PORT)
        }
      }
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class AuthModule { }
