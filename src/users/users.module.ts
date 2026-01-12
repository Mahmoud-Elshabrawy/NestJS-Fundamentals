import { Injectable, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";

class MockUserService {
    findAll() {
        return ['user1', 'user2']
    }
}

abstract class CongigService { }
class DevelopmentCongigService extends CongigService { }
class ProcuctionCongigService extends CongigService { }

@Injectable()
class UserHappitsFactory {
    getHabbits() {
        return ['code', 'sleep']
    }
}

@Injectable()
class DbConnection {
    async connectToDB(): Promise<string> {
        return Promise.resolve('')
    }
}

@Injectable()
class InjectionScopes {
    constructor(private readonly userService2: UserService) { }
}

@Module({
    controllers: [UsersController],
    providers: [
        // standrd provider
        UserService,
        UserHappitsFactory,
        DbConnection,
        // InjectionScopes,

        // value provider (Mock)
        {
            provide: 'App-Name',
            useValue: 'Nest Demo',
        },
        // class provider
        {
            provide: CongigService,
            useClass: process.env.NODE_ENV === 'development' ? DevelopmentCongigService : ProcuctionCongigService
        },
        // factory provider
        {
            provide: 'USER_HAPPITS',
            useFactory: async (userHappits: UserHappitsFactory, dbConnection: DbConnection) => {
                // connect to db
                const db = await dbConnection.connectToDB()
                console.log(db);
                return userHappits.getHabbits()
            },
            inject: [UserHappitsFactory, DbConnection],
        },
    ]
})
export class UserModule { }