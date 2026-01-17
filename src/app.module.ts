import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserModule } from "./users/users.module";
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { UsersController } from "./users/users.controller";


@Module({
    imports: [UserModule, CommonModule],
    providers: [
        {
            provide: 'APP_INTERCEPTOR', useClass: ClassSerializerInterceptor
        },
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // throw new Error("Method not implemented.");
        consumer.apply(LoggerMiddleware).exclude(
            { path: 'users/:id', method: RequestMethod.PATCH },
            { path: 'users/:id', method: RequestMethod.DELETE }
        ).forRoutes(UsersController)
    }

}