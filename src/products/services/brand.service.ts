import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Nike',
      image: ""
    },
  ];

  findAll(){
    return this.brands;
  }

  findOne(id: any) {
    const category = this.brands.find((item) => item.id === id);
    if (!category){
      throw new NotFoundException(`Category #${id} not found`)
    }
    return category;
  }

  create(payload: CreateBrandDto){
    this.counterId += 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);

    return newBrand;
  }

  update(id, payload: UpdateBrandDto){

    const category = this.findOne(id);
    //validamos que haya una marca
    if (category) {
      const index = this.brands.indexOf(category);
      this.brands[index] = {
        ...category,
        ...payload,
      };
      return this.brands[index];
    }
    return null
  }

  delete(id: any){
    const category = this.findOne(id);
    const index = this.brands.indexOf(category)
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`)
    }

    this.brands.splice(index, 1);
    return true;
  }
}
