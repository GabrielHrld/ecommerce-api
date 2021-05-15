import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose'
import { Product } from "src/products/entities/products.entity";
import { Customers } from './customers.entity';

@Schema()
export class Order extends Document{
  @Prop({type: Date})
  date: Date;

  @Prop({type: Types.ObjectId, ref: Customers.name, required: true})
  customer: Customers | Types.ObjectId;

  //solicitamos un array el cuál contenga objetos y dentro el tipo y ref correspondiente
  @Prop({type: [{type: Types.ObjectId, ref: Product.name}]})
  products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order)
