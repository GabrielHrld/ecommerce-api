import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CategoriesService } from "../services/categories.service";

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService
  ){}

  @Get()
  getCategories(){
    return this.categoriesService.findAll();
  }

  @Get(':id')
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
