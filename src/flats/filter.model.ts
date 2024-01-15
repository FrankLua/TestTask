
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
    constructor(query:any){
        this.rooms = Number.parseInt(query.rooms)
        this.areaMin = Number.parseInt(query.areaMin)
        this.areaMax = Number.parseInt(query.areaMax)
        this.floorMin = Number.parseInt(query.floorMin )
        this.floorMax = Number.parseInt(query.floorMax)
        this.priceMin = Number.parseInt(query.priceMin)
        this.priceMax = Number.parseInt(query.priceMax)
        this.numberPage = Number.parseInt(query.numberPage)
        if(query.sortByPrice == 'true'){
            this.sortByPrice = true;
        }      
        else{
            this.sortByPrice  = false;
        }
        if(query.sortByArea == 'true'){
            this.sortByArea  = true;
        }
        else{
            this.sortByArea  = false;
        }
        
        
    }
    public static sortingByArea(list:Flat[]):void {
        list = list.sort((a,b)=>a.area-b.area)
    }
   public static sortingByPrice(list:Flat[]):void {
        list = list.sort((a,b)=>a.prce-b.prce)
    }
}