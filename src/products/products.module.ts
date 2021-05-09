import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'

import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { Brand, BrandSchema } from './entities/brand.entity';
import { Category, CategorySchema } from './entities/categories.entity';
import { Product, ProductSchema } from './entities/products.entity';
import { BrandsService } from './services/brand.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    },
    {
      name: Category.name,
      schema: CategorySchema
    },
    {
      name: Brand.name,
      schema: BrandSchema
    }
  ])],
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService, BrandsService, CategoriesService]
})
export class ProductsModule {}
