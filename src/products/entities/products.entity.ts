import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from './brand.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true, index: true })
  price: number;

  @Prop({ type: Number, required: true, index: true })
  stock: number;

  @Prop({ required: true })
  image: string;

  @Prop({required: true})
  category: string

}

export const ProductSchema = SchemaFactory.createForClass(Product);

//indexacion compuesta de los campos
ProductSchema.index({ price: 1, stock: -1 });
