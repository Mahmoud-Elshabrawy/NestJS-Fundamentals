import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, SetMetadata, UseFilters, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./users.service";
import { UserResponseDto } from "./dtos/user-response.dto";
import { CustomExceptionFilter } from "src/common/filters/custom-exception.filter";
import { AuthGuard } from "src/common/guards/auth.guard";
import { Public } from "src/common/decorators/public.decorator";
import { ConfigService } from "@nestjs/config";


interface EnvironmentVariables {
    NODE_ENV: string;
    DATABASE_TYPE: string;
    DATABASE_HOST: string;
    DATABASE_PORT: number
    DATABASE_USER: string
    DATABASE_PASSWORD: string
    DATABASE_NAME: string
}
//@UseFilters(CustomExceptionFilter)  use it only in user controller
@Controller('users')
export class UsersController {
    constructor(
        private readonly ConfigService: ConfigService<EnvironmentVariables>,
        private readonly userservice: UserService
    ) {
        // console.log(process.env.NODE_ENV);
        console.log(this.ConfigService.get('NODE_ENV'));
        // console.log(this.ConfigService.get('URL', { infer: true }));

    }
    @Get()
    // @SetMetadata('IS_PUBLIC', true)
    @Public()
    async find(): Promise<UserEntity[]> {
        // await new Promise((resolve) => setTimeout(resolve, 6000))
        return this.userservice.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): UserResponseDto {
        return this.userservice.findOne(id)
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): UserEntity {

        return this.userservice.createUser(createUserDto)
    }

    // @UseGuards(AuthGuard)
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