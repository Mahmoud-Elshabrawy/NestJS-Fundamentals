import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { UserModule } from "./users/users.module";
import { CommonModule } from './common/common.module';


@Module({
    imports: [UserModule, CommonModule],
    providers: [
        {
            provide: 'APP_INTERCEPTOR', useClass: ClassSerializerInterceptor
        },
    ]
})
export class AppModule {

}