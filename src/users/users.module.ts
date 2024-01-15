import { Module } from '@nestjs/common';
import { User, UserSchema } from './users.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AppModule } from 'src/app.module';

@Module({
    imports:[        
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])
    ],
    controllers:[UsersController],
    providers:[UsersService, {
        provide: 'User',
        useValue: UserSchema,
      }]    
})
export class UsersModule {
    
}
