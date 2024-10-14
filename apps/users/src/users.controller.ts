import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from './database/database.service';

@Controller()
export class UsersController {
  constructor(private readonly dataBaseService: DatabaseService) { }

  @MessagePattern('create-user')
  createUser(@Payload() user: CreateUserDto) {
    try {
      return this.dataBaseService.createUser(user);
    } catch (error) {
      throw new RpcException(error?.message);
    }
  }

  @MessagePattern('signin')
  signin(@Payload() user: CreateUserDto) {
    try {
      return this.dataBaseService.signin(user);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
