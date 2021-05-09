import {Schema, SchemaFactory, Prop} from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document{

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  lastname: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);