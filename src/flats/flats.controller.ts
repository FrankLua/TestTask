import { Body, Controller,Delete,Get, Post, Put, Query, UseGuards} from '@nestjs/common';
import { FlatsService } from './flats.service';
import { Flat } from './flats.model';
import { FilterFlat } from './filter.model';
import { ApiOperation, ApiQuery, ApiRequestTimeoutResponse, ApiTags } from '@nestjs/swagger';
import { FlatCreate } from './dto/flat-create';
import { FlatUpdate } from './dto/flat-update';
import { AuthGuard } from '@nestjs/passport';
@ApiTags("Поиск квартиры")
@Controller('api/flats/')
export class FlatsController {
    constructor(private flatService:FlatsService){
    }
    @ApiOperation({summary:"Получение квартир по параметрам"})
    @ApiRequestTimeoutResponse({status:200,type:[Flat]})
    @ApiQuery({type:FilterFlat})
    @Get('getByParam')
        async getByParam(@Query() query):Promise<Flat[]>{
            let newQuery =  FilterFlat.fromByQuery(query)
            return this.flatService.getByParams(newQuery);    
    }
    @ApiOperation({summary:"Получение фильтра"})
    @ApiRequestTimeoutResponse({status:200,type:[FilterFlat]})   
    @Get('getFilter')
        async getFilter():Promise<FilterFlat>{            
           return await this.flatService.getFilter();    
    }
    @ApiOperation({summary:"Добавить новую квартиру"})
    @ApiRequestTimeoutResponse({status:200,type:[FlatCreate]})      
    @Post('setFlat')
        async setFlat(@Body() newFlat:FlatCreate):Promise<FlatCreate>{                
           return await this.flatService.setFlat(newFlat);    
    }
    @ApiOperation({summary:"Удалить квартиру"})
    
    @Delete('deleteFlat')
        async deleteFlat(@Query() query:any):Promise<Flat>{                
         return await this.flatService.deleteFlat(query);    
    }
    @ApiOperation({summary:"Обноваить квартиру"})
    @ApiRequestTimeoutResponse({status:200,type:[FlatUpdate]})
    @ApiQuery({type:FlatUpdate})   
    @Put('updateFlat')
        async updateFlat(@Body() newFlat:FlatUpdate):Promise<Flat>{                
          return await this.flatService.updateFlat(newFlat);    
    }
    @UseGuards(AuthGuard())
    @ApiOperation({summary:"Получить все квартиры (для админа)"})
    @ApiRequestTimeoutResponse({status:200,type:[Flat]}) 
    @Get('getAll')
        async getAll(@Query() query:any):Promise<Flat[]>{                
          return await this.flatService.getAll(query);    
    }
}
