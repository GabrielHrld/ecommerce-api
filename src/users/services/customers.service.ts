import { Injectable, NotFoundException } from '@nestjs/common';
import { Customers } from '../entities/customers.entity';
import { CreateCustomerDto, UpdateCustomerDto } from "../dtos/customers.dto";

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customers[] = [
    {
      id: 1,
      name: 'Juan Pablo',
      lastname: 'Sanchez',
      email: 'correo@email.com',
      phone: '1164832611',
      password: '123456',
      role: 'customer'
    },
  ];

  // retorna todos los clientes
  findAll() {
    return this.customers;
  }

  // retorna un solo cliente
  findOne(id: any) {
    const identifier = parseInt(id);
    const customer = this.customers.find((item) => item.id === identifier);
    if (!customer){
      throw new NotFoundException(`Customer #${id} not found`)
    }
    return customer
  }

  // actualiza un cliente
  update(id: any, payload: UpdateCustomerDto){

    const customer = this.findOne(id);
    //validamos que haya un cliente
    if (customer) {
      const index = this.customers.findIndex((item)=> item.id === id);
      this.customers[index] = {
        ...customer,
        ...payload,
      };
      return this.customers[index];
    }
    return null
  }

  //eliminar cliente
  delete(id: any){
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`)
    }

    this.customers.splice(index, 1);
    return true;
  }

  //función para crear clientes
  create(payload: CreateCustomerDto) {
    this.counterId += 1;
    const newcustomer = {
      id: this.counterId,
      ...payload,
    };
    console.log(newcustomer)
    this.customers.push(newcustomer);

    return newcustomer;
  }
}
