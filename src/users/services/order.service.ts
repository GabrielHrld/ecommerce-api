import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOrderDto, UpdateOrderDto, AddProductsToOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  // retorna todas las ordenes
  async findAll() {
    const all = await this.orderModel.find().populate('customer').populate('products').exec();
    return all;
  }

  // retorna una sola orden
  async findOne(id: any) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  // actualiza un usuario
  async update(id: any, data: UpdateOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
    //validamos que haya una orden
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  //eliminar orden
  async delete(id: any) {
    const order = await this.orderModel.findOneAndDelete(id).exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return true;
  }

  //función para crear ordenes
  async create(data: CreateOrderDto) {
    const newOrder = await new this.orderModel(data);
    return newOrder.save();
  }

  //removemos un producto de la orden
  async removeProduct(id: any, productId: any){
    const order = await this.orderModel.findById(id)
    order.products.pull(productId);
    return order.save()
  }

  async addProduct(id: any, productsIds: string[]){
    const order = await this.orderModel.findById(id);
    productsIds.forEach(itemId => {
      order.products.push(itemId)
    });

    return order.save();
  }
}
