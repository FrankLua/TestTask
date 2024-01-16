import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/singup-dto';
import { LoginDto } from './dto/login-dto';

@Controller('api/auth/')
export class AuthController {
    constructor(private authService:AuthService){

    }
    @Post('SingUp')
    async singUp(@Body( ) singUpDto:SingUpDto):Promise<{token:string}>{
        return await this.authService.signUp(singUpDto)
    }
    @Get('Login')
    async Login(@Body( ) loginDto:LoginDto):Promise<{token:string}>{
        return await this.authService.login(loginDto)
    }
}
