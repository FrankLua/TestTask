import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';


export type FlatDocument = HydratedDocument<Flat>;
@Schema({
    timestamps:true
})
export class Flat { 
  
  @Prop()
  id: string;

  @ApiProperty({example:3,description:'Номер'})
  @Prop()
  number: number;
  @ApiProperty({example:2,description:'Количество комнат'})
  @Prop()
  rooms: number;
  @ApiProperty({example:27.3,description:'Площадь'})
  @Prop()
  area: number;
  @ApiProperty({example:181911.47,description:'Цена за квадратный метр'})
  @Prop()
  pricePerMeter: number;
  @ApiProperty({example:18,description:'Этаж'})
  @Prop()  
  floor: number;
  @ApiProperty({example:180000,description:'Общая цена'})
  @Prop()
  prce: number;
}

export const flatSchema = SchemaFactory.createForClass(Flat);