import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SingUpDto } from './dto/singup-dto';
import { NotFoundError } from 'rxjs';
import { LoginDto } from './dto/login-dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>,
        private jwtService: JwtService
    ){

    }
    async signUp(singUpDto:SingUpDto):Promise<{token:string}>{
        const{name,email,password} = singUpDto
        const hashedPassword = await bcrypt.hash(password,10)
        let checkUser = (await this.userModel.$where(a=>a.email===email));
        if(checkUser.length != 0){
            throw new ConflictException
        }
        const user = await this.userModel.create({
            name,
            email,
            password:hashedPassword
        })
        const token = this.jwtService.sign({id:user.email})
        return {token}
    }

    async login(loginDto:LoginDto):Promise<{token:string}>{
        const {email,password} = loginDto
        let user = await this.userModel.findOne({email})
        if(!user){
            throw new UnauthorizedException('User with such an email not exists')
        }
        const isPasswordValid= await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            throw new UnauthorizedException('The Password is not correct')
        }
        const token = this.jwtService.sign({id:user.email})
        return {token}

    }
}
