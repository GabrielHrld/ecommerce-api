import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

@Schema()
export class Customers extends Document {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  lastname: string;

  @Prop({required: true})
  phone: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  role: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customers);