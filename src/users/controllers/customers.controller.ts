import { Controller, Get, Post, Body, Put, Delete, Param, HttpCode, HttpStatus, ParseIntPipe, } from '@nestjs/common';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CustomersService } from "../services/customers.service";

@Controller('customers')
export class CustomersController {
  constructor(
    private customersService: CustomersService, 
  ){}
  
  @Get()
  @HttpCode(HttpStatus.OK)
  getCustomers(){
    return this.customersService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneCustomer(@Param('id', MongoIdPipe) id: any){
    return this.customersService.findOne(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: any){
    return this.customersService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id', MongoIdPipe) id: any, @Body() payload: any){
    console.log(id)
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', MongoIdPipe) id: any){
    return this.customersService.delete(id)
  }
}
