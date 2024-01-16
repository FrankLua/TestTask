import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { timeStamp } from 'console';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';


export type FlatDocument = HydratedDocument<Flat>;
@Schema({   
  timestamps: false,  
  versionKey: false
})
export class Flat { 
  
  @Prop()
  _id:mongoose.Types.ObjectId;
  @ApiProperty({example:3,description:'Номер'})
  @Prop()
  number: number;
  @ApiProperty({example:2,description:'Количество комнат'})
  @Prop()
  rooms: number;
  @ApiProperty({example:27.3,description:'Площадь'})
  @Prop()
  area: String;
  @ApiProperty({example:181911.47,description:'Цена за квадратный метр'})
  @Prop()
  pricePerMeter: number;
  @ApiProperty({example:18,description:'Этаж'})
  @Prop()  
  floor: number;
  @ApiProperty({example:180000,description:'Общая цена'})
  @Prop()
  prce: String;
  @Prop()
  createdAt:String
  @Prop()  
  updatedAt:String
}

export const flatSchema = SchemaFactory.createForClass(Flat);