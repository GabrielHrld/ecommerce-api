import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../entities/products.entity';
import { CreateProductDto, UpdateProductDto} from '../../dataTransferObjects/products.dtos'

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Bla Bla Bla Bla Bla Bla ',
      price: 123,
      stock: 10,
      image: '',
    },
  ];

  // retorna todos los productos
  findAll() {
    return this.products;
  }

  // retorna un solo producto
  findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product){
      throw new NotFoundException(`Product #${id} not found`)
    }
    return product
  }

  // actualiza un producto
  update(id, payload: UpdateProductDto){

    const product = this.findOne(id);
    //validamos que haya un producto
    if (product) {
      const index = this.products.findIndex((item)=> item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null
  }

  //eliminar producto
  delete(id: string){
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`)
    }

    this.products.splice(index, 1);
    return true;
  }

  //función para crear productos
  create(payload: CreateProductDto) {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);

    return newProduct;
  }
}
