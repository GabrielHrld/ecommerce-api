import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { ProductsModule } from 'src/products/products.module';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { Customers, CustomerSchema } from './entities/customers.entity';
import { User, UserSchema } from './entities/users.entity';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    },
    {
      name: Customers.name,
      schema: CustomerSchema
    }
  ]),ProductsModule],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService]
})
export class UsersModule {}
