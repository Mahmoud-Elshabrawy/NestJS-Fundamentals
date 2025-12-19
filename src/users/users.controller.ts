import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid'

@Controller('users')
export class UsersController {
    private users: UserEntity[] = []

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

    @Patch(":id")
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        // find user based on id
        const index = this.users.findIndex(user => user.id.toString() === id)
        this.users[index] = { ...this.users[index], ...updateUserDto }
        return this.users[index]
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: string) {
        const index = this.users.findIndex(user => user.id.toString() === id)
        this.users.splice(index, 1)
        return null
    }
}