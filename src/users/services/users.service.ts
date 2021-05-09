import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import { User } from '../entities/users.entity';
import { CreateUserDto, UpdateUserDto} from '../dtos/users.dto'
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @InjectModel(User.name) private userModel: Model<User>
  ){}
  

  // retorna todos los usuarios
  async findAll() {
    const all = await this.userModel.find().exec()
    return all
    // return this.users;
  }

  // retorna un solo usuario
  async findOne(id: any) {
    const user = await this.userModel.findById(id).exec();
    if (!user){
      throw new NotFoundException(`User #${id} not found`)
    }
    return user
  }

  // actualiza un usuario
  // update(id, payload: UpdateUserDto){
  //   const user = this.findOne(id);
  //   //validamos que haya un usuario
  //   if (user) {
      
  //     const index = this.users.indexOf(user)
  //     this.users[index] = {
  //       ...user,
  //       ...payload,
  //     };
  //     return this.users[index];
  //   }
  //   return null
  // }

  // //eliminar usuario
  // delete(id: any){
  //   const user = this.findOne(id);
  //   const index = this.users.indexOf(user);
  //   if (index === -1) {
  //     throw new NotFoundException(`User #${id} not found`)
  //   }

  //   this.users.splice(index, 1);
  //   return true;
  // }

  // //función para crear usuarios
  // create(payload: CreateUserDto) {
  //   this.counterId += 1;
  //   const newUser = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.users.push(newUser);

  //   return newUser;
  // }

  // async getOrderByUser(id: any) {
  //   const user =  this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user,
  //     products: await this.productsService.findAll(),
  //   }
  // }
}
