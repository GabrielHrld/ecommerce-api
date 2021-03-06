import { Controller, Get, Post, Body, Put, Delete, Param, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import {BrandsService} from '../services/brand.service';
import { CreateBrandDto, UpdateBrandDto } from "../dtos/brands.dto";
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('brands')
export class BrandsController {
  constructor(
    private brandsService: BrandsService
  ){}

  @Get()
  @HttpCode(HttpStatus.OK)
  getBrands(){
    return this.brandsService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getBrand(@Param('id', MongoIdPipe) id: any){
    console.log(id)
    return this.brandsService.findOne(id) 
  }
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateBrandDto){
    return this.brandsService.create(payload)
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id', MongoIdPipe) id: any, @Body() payload: UpdateBrandDto){
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', MongoIdPipe) id: any){
    return this.brandsService.delete(id)
  }
}
