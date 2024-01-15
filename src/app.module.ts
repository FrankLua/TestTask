import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { FlatsModule } from './flats/flats.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath:`.${process.env.NODE_ENV}.env`
        }),
    MongooseModule.forRoot(process.env.MongoDb_String),
    UsersModule,
    FlatsModule],
    providers: [],
    controllers: []
})
export class AppModule{

}