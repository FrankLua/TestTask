import { ApiProperty } from "@nestjs/swagger";

export class FlatUpdate{    
    @ApiProperty({example:"6456697c1d2c9ad5999b8197",description:'mongoId'})   
    id: string;  
    @ApiProperty({example:3,description:'Номер'})    
    number: number;
    @ApiProperty({example:2,description:'Количество комнат'})    
    rooms: number;
    @ApiProperty({example:27.3,description:'Площадь'})    
    area: number;
    @ApiProperty({example:181911.47,description:'Цена за квадратный метр'})    
    pricePerMeter: number;
    @ApiProperty({example:18,description:'Этаж'})   
    floor: number;
    @ApiProperty({example:180000,description:'Общая цена'})   
    prce: number;
}