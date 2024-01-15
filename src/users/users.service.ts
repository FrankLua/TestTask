import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './users.model';
import { NotFoundError } from 'rxjs';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)    
        private userModel: mongoose.Model<User>,) {
    }
    async getAll():Promise<User[]>{
        const users = await this.userModel.find()
        return users;
    }
    async createUser(user:User):Promise<User>{
        return await this.userModel.create(user)
    }
    async findById(id:string):Promise<User>{
        try{
            const res = await this.userModel.findById(id)
            if(!res){
                throw  new NotFoundException
            }
            return res
        }
        catch(e){
            
            throw  new InternalServerErrorException
        }
        
    }
}
