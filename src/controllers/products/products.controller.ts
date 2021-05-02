import { Controller, Get, Query, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {

  @Get('')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products ${limit}, ${offset}, ${brand}`;
  }

  @Get('filter')
  getProductFilter() {
    return `123123123product filter`;
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return `product ${id}`;
  }
}
