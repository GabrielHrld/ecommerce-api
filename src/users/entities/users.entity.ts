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
  phone: string;

  @Prop({required: true})
  password: string;

  @Prop()
  promo: boolean;

  @Prop({required: true})
  createdAt: string;
  @Prop({required: true})
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);