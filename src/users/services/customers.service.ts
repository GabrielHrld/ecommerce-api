import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customers } from '../entities/customers.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customers.name) private customersModel: Model<Customers>,
  ) {}

  // retorna todos los clientes
  async findAll() {
    const all = await this.customersModel.find().exec();
    return all;
  }

  // retorna un solo cliente
  async findOne(id: any) {
    const customer = await this.customersModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  //función para crear clientes
  async create(data: CreateCustomerDto) {
    const newCustomer = await new this.customersModel(data);
    return newCustomer.save();
  }

  // actualiza un cliente
  async update(id: any, data: UpdateCustomerDto) {
    const user = await this.customersModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return user;
  }

  //eliminar cliente
  async delete(id: any) {
    const user = await this.customersModel.findOneAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return true;
  }
}
