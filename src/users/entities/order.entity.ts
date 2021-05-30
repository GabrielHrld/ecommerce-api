import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose'
import { Product } from "src/products/entities/products.entity";
import { Customers } from './customers.entity';

@Schema()
export class Order extends Document{
  
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  lastname: string;
  
  @Prop({required: true})
  DNI: string;

  @Prop({required: true})
  state: string;

  @Prop({required: true})
  address: string;

  @Prop({required: true})
  postal: number;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  phone: string;

  @Prop({type: Array, required: true})
  products: object[];

  @Prop({required: true})
  status: string;

  @Prop({required: true})
  date: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order)
