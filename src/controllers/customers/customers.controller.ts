import { Controller, Get, Post, Body, Put, Delete, Param, } from '@nestjs/common';

@Controller('customers')
export class CustomersController {

  @Get()
  getCustomers(){
    return 'Customers'
  }

  @Post()
  create(@Body() payload: any){
    return {
      message: 'accion de crear customers',
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
