import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { UserModule } from "./users/users.module";


@Module({
    imports: [UserModule],
    providers: [
        {
            provide: 'APP_INTERCEPTOR', useClass: ClassSerializerInterceptor
        },
    ]
})
export class AppModule {

}