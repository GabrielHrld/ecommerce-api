import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';

@Controller('brands')
export class BrandsController {

  @Get()
  getBrands(){
    return 'brands'
  }

  @Post()
  create(@Body() payload: any){
    return {
      message: 'accion de crear brands',
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
