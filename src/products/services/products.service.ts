import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Product } from '../entities/products.entity';
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // retorna todos los productos
  async findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {}
      const {limit, offset} = params
      const {minPrice, maxPrice} = params
      // valido que haya un min y max price
      if(minPrice && maxPrice){
        //$gte y $lte reciben minimo y máximo para formar un rango
        filters.price = {$gte: minPrice, $lte: maxPrice};
      }
      return this.productModel.find(filters).populate('brand').skip(offset).limit(limit).exec();
    }
    const all = await this.productModel.find().populate('brand').exec();
    return all;
  }

  // retorna un solo producto
  async findOne(id: any) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  //función para crear productos
  async create(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  // actualiza un producto
  async update(id: any, changes: UpdateProductDto) {
    //$set me permite no reemplazar el objeto por completo, si no, sólo los campos sujetos a cambios
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  //eliminar producto
  async delete(id: any) {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return true;
  }
}
