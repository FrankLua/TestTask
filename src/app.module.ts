import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { FlatsModule } from './flats/flats.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        
        JwtModule,
        ConfigModule.forRoot({
            envFilePath:`.${process.env.NODE_ENV}.env`
        }),
    MongooseModule.forRoot(process.env.MongoDb_String),    
    FlatsModule,
    AuthModule],
    providers: [],
    controllers: []
})
export class AppModule{

}