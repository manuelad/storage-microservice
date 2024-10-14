import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateUserDto {

    @ApiProperty({
        description: 'User name',
        required: true
    })
    @IsString()
    userName: string

    @ApiProperty({
        description: 'User password',
        required: true
    })
    @IsString()
    password: string
}
