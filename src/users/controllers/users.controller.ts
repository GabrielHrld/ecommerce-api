import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards, } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from 'src/auth/models/roles.model';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateUserDto } from '../dtos/users.dto';
import { UsersService} from '../services/users.service'

@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ){}
  @Roles(Role.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers(){
    return this.usersService.findAll()
  }

  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Get(':id/orders')
  getOrders(@Param('id', MongoIdPipe) id: any){
    return this.usersService.getOrderByUser(id)
  }

  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('id', MongoIdPipe) id: any){
    return this.usersService.findOne(id);
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateUserDto){
    return this.usersService.create(payload)
  }

  @Roles(Role.CUSTOMER)
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id', MongoIdPipe) id: any, @Body() payload: any){
    return this.usersService.update(id, payload)
  }

  @Roles(Role.CUSTOMER)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', MongoIdPipe) id: any){
    return this.usersService.delete(id);
  }
}
