import { Prop, raw } from "@nestjs/mongoose"
import { Flat } from "../flats.model"
import mongoose from "mongoose"
import { ApiProperty } from "@nestjs/swagger";

export class FlatCreate{
    _id:mongoose.Types.ObjectId;
    @ApiProperty({example:3,description:'Номер'})
    number:number
    @ApiProperty({example:2,description:'Количество комнат'})
    rooms:number 
    @ApiProperty({example:27.3,description:'Площадь'})
    area:String
    pricePerMeter:number
    @ApiProperty({example:18,description:'Этаж'})
    floor:number
    @ApiProperty({example:180000,description:'Общая цена'})
    prce:String

    createdAt:String
    updatedAt:String
    public static fromQuery(query:any):FlatCreate{
        let reply = new FlatCreate()
        reply.area = query.area
        reply.floor = query.floor
        reply.prce = query.prce
        reply.rooms = query.rooms
        reply.pricePerMeter = this.round(Number.parseInt(query.prce) / Number.parseInt(query.area),2)
        reply.number = query.number
        return reply
    }
    private static round(num: number, fractionDigits: number): number {
        return Number(num.toFixed(fractionDigits));
    }
}