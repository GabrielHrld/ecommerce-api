import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<Brand>
  ){}

  async findAll(){
    const all = await this.brandModel.find();
    return all
  }

  async findOne(id: any) {
    
    const brand = await this.brandModel.findById(id);
    if (!brand){
      throw new NotFoundException(`Brand #${id} not found`)
    }
    return brand;
  }

  async create(data: CreateBrandDto){
    const newBrand = await new this.brandModel(data)

    return newBrand.save();
  }

  async update(id: any, data: UpdateBrandDto){
    const brand = await this.brandModel.findByIdAndUpdate(id, {$set: data}, {new: true}).exec()
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`)
    }
    return brand
  }

  async delete(id: any){
    const brand = await this.brandModel.findByIdAndDelete(id).exec();
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`)
    }
    return true;
  }
}
