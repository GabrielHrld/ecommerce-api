import { Controller, Get, Post, Body, Put, Param, Delete, } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get()
  getUsers(){
    return 'Users'
  }

  @Post()
  create(@Body() payload: any){
    return {
      message: 'accion de crear usuarios',
      payload
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any){
    return{
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number){
    return {
      id
    }
  }
}
