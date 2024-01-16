import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { Passport } from 'passport';
import { PassportModule, PassportStrategy} from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt-strategy';



@Module({
  imports:[
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
  }),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
    MongooseModule.forFeature([{name:'User',schema:UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[JwtStrategy,PassportModule]
})
export class AuthModule {}
