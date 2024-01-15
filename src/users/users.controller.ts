import { Body, Controller,Get, Post,Param,Bind} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('api/users/')
export class UsersController {
    constructor(private userService:UsersService){

    }
    @Get('getAll')
        async getAllUser():Promise<User[]>{
            return this.userService.getAll();    
    }
    @Post('setOne')
    async setUser(
        @Body()
        user:CreateUserDto
    ):Promise<User>{
        return this.userService.createUser(user)
    }
    @Get(':id') 
    async getById(@Param('id') id:string):Promise<User>{
        return this.userService.findById(id);    
    }
}
