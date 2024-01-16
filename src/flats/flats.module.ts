import { Module } from '@nestjs/common';
import { FlatsController } from './flats.controller';
import { FlatsService } from './flats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Flat,flatSchema } from './flats.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule,      
    MongooseModule.forFeature([{ name: 'Flat', schema: flatSchema}])
],
  controllers: [FlatsController],
  providers: [FlatsService,{    
    provide: 'Flat',
    useValue: flatSchema,
  }]
})
export class FlatsModule {}
