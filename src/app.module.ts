import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/controllers/products.controller';
import { CategoriesController } from './products/controllers/categories.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './users/controllers/users.controller';
import { CustomersController } from './users/controllers/customers.controller';
import { BrandsController } from './products/controllers/brands.controller';
import { ProductsService } from './products/services/products.service';
import { CategoriesService } from './products/services/categories.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    OrdersController,
    UsersController,
    CustomersController,
    BrandsController,
  ],
  providers: [AppService, ProductsService, CategoriesService],
})
export class AppModule {}
