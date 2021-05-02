import { Controller, Get, Post, Body, Put, Delete, Param, } from '@nestjs/common';

@Controller('orders')
export class OrdersController {

  @Get()
  getOrders(){
    return 'Orders'
  }

  @Post()
  create(@Body() payload: any){
    return {
      message: 'accion de crear ordenes',
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
