import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'apps/nestjs-backend-template/src/auth/dto/create-user.dto';

@Injectable()
export class DatabaseService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        try {
            const { userName, password } = createUserDto
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password, salt);
            const user = await this.userRepository.save({ userName, password: hashpassword });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: pass, ...result } = user
            return result
        } catch (error) {
            throw new RpcException(error?.message)
        }
    }

    async signin(createUserDto: CreateUserDto) {
        try {
            const { userName, password } = createUserDto
            const user = await this.userRepository.findOne({ where: { userName } });
            if (!user) throw new RpcException({ message: 'User not found', status: HttpStatus.NOT_FOUND });
            const compare = await bcrypt.compare(password, user.password);
            if (!compare) throw new RpcException({ message: 'Invalid password', status: HttpStatus.BAD_REQUEST });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: pass, ...result } = user
            return result
        } catch (error) {
            throw error
        }
    }
}
