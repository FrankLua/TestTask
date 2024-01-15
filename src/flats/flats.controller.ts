import { Controller,Get, Query} from '@nestjs/common';
import { FlatsService } from './flats.service';
import { Flat } from './flats.model';
import { FilterFlat } from './filter.model';
import { ApiOperation, ApiQuery, ApiRequestTimeoutResponse } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
@Controller('api/flats/')
export class FlatsController {
    constructor(private flatService:FlatsService){
    }
    @ApiOperation({summary:"Получение квартир по параметрам"})
    @ApiRequestTimeoutResponse({status:200,type:[Flat]})
    @ApiQuery({type:FilterFlat})
    @Get('getByParam')
        async getByParam(@Query() query):Promise<Flat[]>{
            let newQuery = new FilterFlat(query);
            return this.flatService.getAll(newQuery);    
    }
}
