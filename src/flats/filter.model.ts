
import {Query as ExpressQuery} from 'express-serve-static-core'
import { Flat } from './flats.model'
import { ApiProperty } from '@nestjs/swagger'
export class FilterFlat{
    @ApiProperty({example:'4',description:'Задать количество комнат'})
    rooms:number
    @ApiProperty({example:20,description:'Задать минимальную площадь'})
    areaMin:number
    @ApiProperty({example:60,description:'Задать максимальную площадь'})
    areaMax:number 
    @ApiProperty({example:5,description:'Выбрать минимальный этаж'})
    floorMin:number 
    @ApiProperty({example:60,description:'Выбрать максимальный этаж'})
    floorMax:number 
    @ApiProperty({example:5000,description:'Выбрать минимально допустимую цену'})
    priceMin:number 
    @ApiProperty({example:10000000,description:'Выбрать максимально допустимую цену'})
    priceMax:number     
    @ApiProperty({example:false,description:'Сортировка по цене'})
    sortByPrice:Boolean
    @ApiProperty({example:true,description:'Сортировка по площаде'})
    sortByArea:Boolean
    @ApiProperty({example:1,description:'Номер страницы'})
    numberPage:number  
    public static fromByParams(minPrice:number,maxPrice:number,minArea:number,maxArea:number,minFloor:number,maxFloor:number):FilterFlat{
        let reply = new FilterFlat()
        reply.rooms = 1
        reply.areaMin = minArea
        reply.areaMax = maxArea
        reply.floorMin = minFloor
        reply.floorMax = maxFloor
        reply.priceMin = minPrice
        reply.priceMax = maxPrice
        reply.sortByArea = false,
        reply.sortByPrice = false
        return reply;
    }
    public static fromByQuery(query:any):FilterFlat{
        let reply = new FilterFlat()
        reply.rooms = Number.parseInt(query.rooms)
        reply.areaMin = Number.parseInt(query.areaMin)
        reply.areaMax = Number.parseInt(query.areaMax)
        reply.floorMin = Number.parseInt(query.floorMin )
        reply.floorMax = Number.parseInt(query.floorMax)
        reply.priceMin = Number.parseInt(query.priceMin)
        reply.priceMax = Number.parseInt(query.priceMax)
        reply.numberPage = Number.parseInt(query.numberPage)
        if(query.sortByPrice == 'true'){
            reply.sortByPrice = true;
        }      
        else{
            reply.sortByPrice  = false;
        }
        if(query.sortByArea == 'true'){
            reply.sortByArea  = true;
        }
        else{
            reply.sortByArea  = false;
        } 
        return reply;   
        
    }
    
    public static sortingByArea(list:Flat[]):void {
        list = list.sort((a,b)=>Number.parseInt((a.area).toString())-Number.parseInt((b.area).toString()))
    }
   public static sortingByPrice(list:Flat[]):void {
        list = list.sort((a,b)=>Number.parseInt((a.prce).toString())-Number.parseInt((b.prce).toString()))
    }
}