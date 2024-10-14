import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) { }
  createUser(user: CreateUserDto) {
    try {
      return this.databaseService.createUser(user)
    } catch (error) {
      throw new RpcException(error)
    }
  }

  signin(user: CreateUserDto) {
    try {
      return this.databaseService.signin(user)
    } catch (error) {
      throw new RpcException(error)
    }
  }
}
