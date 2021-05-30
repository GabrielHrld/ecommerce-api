import { Controller, Get, Post, Body, Put, Delete, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { OrderService } from '../services/order.service';
import {CreateOrderDto, UpdateOrderDto, AddProductsToOrderDto} from '../dtos/order.dto'

@Controller('orders')
export class OrderController {
  constructor(
    private orderService: OrderService, 
  ){}
  
  @Get()
  @HttpCode(HttpStatus.OK)
  getCustomers(){
    return this.orderService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneCustomer(@Param('id', MongoIdPipe) id: any){
    return this.orderService.findOne(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateOrderDto){
    return this.orderService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id', MongoIdPipe) id: any, @Body() payload: UpdateOrderDto){
    return this.orderService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', MongoIdPipe) id: any){
    return this.orderService.delete(id)
  }

  // @Delete(':id/products/:productId')
  // @HttpCode(HttpStatus.OK)
  // deleteProduct(@Param('id', MongoIdPipe) id: any, @Param('productId', MongoIdPipe) productId: any){
  //   return this.orderService.removeProduct(id, productId)
  // }

  // @Put(':id/products')
  // @HttpCode(HttpStatus.CREATED)
  // updateProducts(@Param('id', MongoIdPipe) id: any, @Body() payload: AddProductsToOrderDto){
  //   console.log(id)
  //   return this.orderService.addProduct(id, payload.productsIds);
  // }
}
