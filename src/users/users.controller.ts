import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly userservice: UserService) { }
    @Get()
    find(): UserEntity[] {
        return this.userservice.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): UserEntity | undefined {
        return this.userservice.findOne(id)
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): UserEntity {

        return this.userservice.createUser(createUserDto)
    }

    @Patch(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): UserEntity {
        return this.userservice.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id', ParseUUIDPipe) id: string) {
        this.userservice.deleteUser(id)
    }
}