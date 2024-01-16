import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    versionKey:false
})
export class User {
    @Prop()
    name: string;
  
    @Prop({unique:[true,'Dublicate email entered']})
    email: string;
  
    @Prop()
    password: string;
  }
  export const UserSchema = SchemaFactory.createForClass(User)