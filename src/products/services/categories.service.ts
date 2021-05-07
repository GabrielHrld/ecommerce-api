import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/categories.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1'
    },
  ];

  findAll(){
    return this.categories;
  }

  findOne(id: any) {
    const identifier = parseInt(id)
    const category = this.categories.find((item) => item.id === identifier);
    if (!category){
      throw new NotFoundException(`Category #${id} not found`)
    }
    return category;
  }

  create(payload: CreateCategoryDto){
    this.counterId += 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);

    return newCategory;
  }

  update(id, payload: UpdateCategoryDto){

    const category = this.findOne(id);
    //validamos que haya una categoría
    if (category) {
      const index = this.categories.indexOf(category);
      this.categories[index] = {
        ...category,
        ...payload,
      };
      return this.categories[index];
    }
    return null
  }

  delete(id: any){
    const category = this.findOne(id);
    const index = this.categories.indexOf(category)
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`)
    }

    this.categories.splice(index, 1);
    return true;
  }
}
