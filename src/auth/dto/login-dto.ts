
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, isString } from "@nestjs/class-validator";


export class LoginDto{
  

    @ApiProperty({example:"Лёша",description:'Имя'})
    @IsString()
    @IsNotEmpty()
    email:number

    @ApiProperty({example:"qwerty12345",description:'Пароль'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password:String
}