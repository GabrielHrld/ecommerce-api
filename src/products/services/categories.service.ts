import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose'

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ){}

  async findAll(){
    const all = await this.categoryModel.find().exec()
    return all;
  }

  async findOne(id: any) {
    const category = await this.categoryModel.findById(id).exec()
    if (!category){
      throw new NotFoundException(`Category #${id} not found`)
    }
    return category;
  }

  create(data: CreateCategoryDto){
    const newCategory = new this.categoryModel(data)
    return newCategory.save();
  }

  async update(id, data: UpdateCategoryDto){
    const category = await this.categoryModel.findByIdAndUpdate(id, {$set: data}, {new: true}).exec()
    if(!category){
      throw new NotFoundException(`Category ${id} not found`)
    }
    
    return category
  }

  async delete(id: any){
    const category = await this.categoryModel.findByIdAndDelete(id).exec()
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`)
    }
    return true;
  }
}
