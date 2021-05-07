import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories = [
    {
      id: '1',
      name: 'Category 1'
    },
  ];

  findAll(){
    return this.categories;
  }

  findOne(id: any) {
    const category = this.categories.find((item) => item.id === id);
    if (!category){
      throw new NotFoundException(`Category #${id} not found`)
    }
    return category;
  }

  create(payload){
    this.counterId += 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);

    return newCategory;
  }

  update(id, payload){

    const category = this.findOne(id);
    //validamos que haya una categoría
    if (category) {
      const index = this.categories.findIndex((item)=> item.id === id);
      this.categories[index] = {
        ...category,
        ...payload,
      };
      return this.categories[index];
    }
    return null
  }

  delete(id: string){
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`)
    }

    this.categories.splice(index, 1);
    return true;
  }
}
