import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid'

@Injectable({ scope: Scope.DEFAULT })
export class UserService {
    constructor(@Inject('App-Name') private readonly appName: string,
        @Inject('USER_HAPPITS') private readonly userHappits: string) {
        console.log('UserService Initiated');

    }
    private users: UserEntity[] = []

    findAll(): UserEntity[] {
        console.log(this.appName);
        console.log(this.userHappits);

        return this.users
    }

    findOne(id: string): UserEntity | undefined {
        return this.users.find(user => user.id === id)
    }

    createUser(createUserDto: CreateUserDto): UserEntity {
        const newUser: UserEntity = { ...createUserDto, id: uuid() }
        this.users.push(newUser)
        return newUser
    }

    updateUser(id: string, updateUserDto: UpdateUserDto): UserEntity {
        const index = this.users.findIndex(user => user.id.toString() === id)
        if (index === -1) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        this.users[index] = { ...this.users[index], ...updateUserDto }
        return this.users[index]
    }
    deleteUser(id: string): void {
        const index = this.users.findIndex(user => user.id.toString() === id)
        this.users.splice(index, 1)
    }
}