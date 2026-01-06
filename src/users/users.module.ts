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

@Module({
    controllers: [UsersController],
    providers: [
        // standrd provider
        UserService,
        UserHappitsFactory,

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
            useFactory: (userHappits: UserHappitsFactory) => userHappits.getHabbits(),
            inject: [UserHappitsFactory],
        },
    ]
})
export class UserModule { }