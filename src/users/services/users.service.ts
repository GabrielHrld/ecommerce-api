import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/users.entity';
import { CreateUserDto, UpdateUserDto} from '../dtos/users.dto'

@Injectable()
export class UsersService {
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
    return this.users;
  }

  // retorna un solo usuario
  findOne(id: any) {
    const identifier = parseInt(id);
    const user = this.users.find((item) => item.id === identifier);
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
      const index = this.users.findIndex((item)=> item.id === id);
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
    const index = this.users.findIndex((item) => item.id === id);
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
}
