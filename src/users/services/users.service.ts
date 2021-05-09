import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // retorna todos los usuarios
  async findAll() {
    const all = await this.userModel.find().exec();
    return all;
    // return this.users;
  }

  // retorna un solo usuario
  async findOne(id: any) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  // actualiza un usuario
  async update(id, data: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
    //validamos que haya un usuario
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  // //eliminar usuario
  async delete(id: any) {
    const user = await this.userModel.findOneAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return true;
  }

  // //función para crear usuarios
  async create(data: CreateUserDto) {
    const newUser = await new this.userModel(data);
    return newUser.save();
  }

  async getOrderByUser(id: any) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
