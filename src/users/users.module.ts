import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { ProductsModule } from 'src/products/products.module';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { Customers, CustomerSchema } from './entities/customers.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { User, UserSchema } from './entities/users.entity';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { OrderController } from './controllers/order.controller'
import { OrderService } from './services/order.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema 
    },
    {
      name: Customers.name,
      schema: CustomerSchema
    },
    {
      name: Order.name,
      schema: OrderSchema
    }
  ]),ProductsModule],
  controllers: [UsersController, CustomersController, OrderController],
  providers: [UsersService, CustomersService, OrderService]
})
export class UsersModule {}
