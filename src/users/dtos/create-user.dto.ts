import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto {
    @IsString()
    @Length(3, 20)
    name: string

    @IsEmail()
    email: string

    @IsString()
    country: string
}