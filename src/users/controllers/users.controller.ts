import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, } from '@nestjs/common';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateUserDto } from '../dtos/users.dto';
import { UsersService} from '../services/users.service'

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ){}

  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers(){
    return this.usersService.findAll()
  }

  @Get(':id/orders')
  getOrders(@Param('id', MongoIdPipe) id: any){
    return this.usersService.getOrderByUser(id)
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('id', MongoIdPipe) id: any){
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateUserDto){
    return this.usersService.create(payload)
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id', MongoIdPipe) id: any, @Body() payload: any){
    return this.usersService.update(id, payload)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', MongoIdPipe) id: any){
    return this.usersService.delete(id);
  }
}
