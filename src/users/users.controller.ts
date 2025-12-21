import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid'
// import { CustomValidationPipe } from "./pipes/validation.pipe";

@Controller('users')
export class UsersController {
    private users: UserEntity[] = []

    @Get()
    find(): UserEntity[] {
        return this.users
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): UserEntity | undefined {
        console.log(typeof (id));

        return this.users.find(user => user.id === id)
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        const newUser: UserEntity = { ...createUserDto, id: uuid() }
        this.users.push(newUser)
        return newUser
    }

    @Patch(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        // find user based on id
        const index = this.users.findIndex(user => user.id.toString() === id)
        if (index === -1) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        this.users[index] = { ...this.users[index], ...updateUserDto }
        return this.users[index]
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id', ParseUUIDPipe) id: string) {
        const index = this.users.findIndex(user => user.id.toString() === id)
        this.users.splice(index, 1)
        return null
    }
}