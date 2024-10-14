import { Controller, Post, Body, ValidationPipe, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_SERVICE } from '../config/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(USER_SERVICE) private readonly userClient: ClientProxy,
    private jwtService: JwtService
  ) { }


  @Post('signup')
  async create(@Body(new ValidationPipe()) createAuthDto: CreateUserDto) {
    try {
      const user = await firstValueFrom(this.userClient.send('create-user', createAuthDto))
      return {
        access_token: this.jwtService.sign({ ...user }),
        ...user
      }
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Post('signin')
  async signin(@Body(new ValidationPipe()) createAuthDto: CreateUserDto) {
    try {
      const user = await firstValueFrom(this.userClient.send('signin', createAuthDto))
      return {
        access_token: this.jwtService.sign({ ...user }),
        ...user
      }
    } catch (error) {
      throw new RpcException({ message: error.message, status: error.status })
    }
  }


}
