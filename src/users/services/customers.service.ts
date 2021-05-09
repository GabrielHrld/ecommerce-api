import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import { Customers } from '../entities/customers.entity';
import { CreateCustomerDto, UpdateCustomerDto } from "../dtos/customers.dto";

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customers.name) private customersModel: Model<Customers>
  ){}

  // retorna todos los clientes
  async findAll() {
    const all = await this.customersModel.find().exec()
    return all
  }

  // retorna un solo cliente
  async findOne(id: any) {
    const customer = await this.customersModel.findById(id);
    if (!customer){
      throw new NotFoundException(`Customer #${id} not found`)
    }
    return customer
  }

  // actualiza un cliente
  // update(id: any, payload: UpdateCustomerDto){

  //   const customer = this.findOne(id);
  //   //validamos que haya un cliente
  //   if (customer) {
  //     const index = this.customers.indexOf(customer);
  //     this.customers[index] = {
  //       ...customer,
  //       ...payload,
  //     };
  //     return this.customers[index];
  //   }
  //   return null
  // }

  // //eliminar cliente
  // delete(id: any){
  //   const customer = this.findOne(id);
  //   const index = this.customers.indexOf(customer);
  //   console.log(`index ${index}`)
  //   if (index === -1) {
  //     throw new NotFoundException(`Customer #${id} not found`)
  //   }

  //   this.customers.splice(index, 1);
  //   return true;
  // }

  // //función para crear clientes
  // create(payload: CreateCustomerDto) {
  //   this.counterId += 1;
  //   const newcustomer = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   console.log(newcustomer)
  //   this.customers.push(newcustomer);

  //   return newcustomer;
  // }
}
