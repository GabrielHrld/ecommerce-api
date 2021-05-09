import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService, ConfigType } from "@nestjs/config";
import { User } from '../entities/users.entity';
import { CreateUserDto, UpdateUserDto} from '../dtos/users.dto'
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';
import config from '../../utils/config'
import { Db } from "mongodb";

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @Inject('MONGO') private database:Db
  ){}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'Franco Daniel',
      lastname: 'Herrera',
      email: 'correo@email.com',
      password: '123456',
      role: 'admin'
    },
  ];

  // retorna todos los usuarios
  findAll() {
    return this.database.collection('test')
    // return this.users;
  }

  // retorna un solo usuario
  findOne(id: any) {
    const user = this.users.find((item) => item.id === id);
    if (!user){
      throw new NotFoundException(`User #${id} not found`)
    }
    return user
  }

  // actualiza un usuario
  update(id, payload: UpdateUserDto){
    const user = this.findOne(id);
    //validamos que haya un usuario
    if (user) {
      
      const index = this.users.indexOf(user)
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    }
    return null
  }

  //eliminar usuario
  delete(id: any){
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`)
    }

    this.users.splice(index, 1);
    return true;
  }

  //función para crear usuarios
  create(payload: CreateUserDto) {
    this.counterId += 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);

    return newUser;
  }

  getOrderByUser(id: any): Order{
    const user =  this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    }
  }
}
