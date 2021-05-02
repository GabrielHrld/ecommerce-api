import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Res
} from '@nestjs/common';
import { Response } from "express";

@Controller('products')
export class ProductsController {
  private mock: Array<object> = [];

  @Get('')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.mock;
  }

  @Get('filter')
  getProductFilter() {
    return `123123123product filter`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Res() response: Response, @Param('id') id: string) {
    return {
      message : `product ${id}`
    };
  }

  @Post()
  create(@Body() payload: any) {
    this.mock.push(payload);

    return payload;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
