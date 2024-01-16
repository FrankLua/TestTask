
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, isString } from "@nestjs/class-validator";


export class SingUpDto{
    
    @ApiProperty({example:"Test@email.com",description:'Емайл'})
    @IsString()
    @IsNotEmpty()
    email:String   

    @ApiProperty({example:"Лёша",description:'Имя'})
    @IsString()
    @IsNotEmpty()
    name:number

    @ApiProperty({example:"qwerty12345",description:'Пароль'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password:String
}