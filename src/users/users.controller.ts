import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid'

@Controller('users')
export class UsersController {
    private readonly users: UserEntity[] = []

    @Get()
    find(): UserEntity[] {
        return this.users
    }

    @Get(':id')
    findOne(@Param('id') id: string): UserEntity | undefined {
        return this.users.find(user => user.id === id)
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        const newUser: UserEntity = { ...createUserDto, id: uuid() }
        this.users.push(newUser)
        return newUser
    }

    @Patch(":username")
    update(@Param('username') username, @Body() updateUserDto: UpdateUserDto) {
        return updateUserDto
    }

    @Delete()
    @HttpCode(204)
    delete(): string {
        return 'delete user'
    }
}