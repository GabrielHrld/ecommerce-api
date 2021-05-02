import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {

  @Get(':id/products/:productId')
  getCategory(@Param('id') id: any, @Param('productId') productId: string) {
    return `category ${id} and product ${productId}`;
  }

  @Post()
  create(@Body() payload: any){
    return {
      message: 'accion de crear categories',
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
