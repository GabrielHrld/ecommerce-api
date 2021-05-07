import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { CategoriesService } from "../services/categories.service";

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService
  ){}

  @Get()
  @HttpCode(HttpStatus.OK)
  getCategories(){
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getCategory(@Param('id') id: any) {
    return this.categoriesService.findOne(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateCategoryDto){
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id') id: any, @Body() payload: UpdateCategoryDto){
    return this.categoriesService.update(id, payload)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: any){
    return this.categoriesService.delete(id);
  }
}
