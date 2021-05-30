import {
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
  IsNotEmpty,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDto } from './categories.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string 

}

//  PartialType obtiene los datos de la clase Create y hace opcionales sus atributos
export class UpdateProductDto extends PartialType(CreateProductDto){}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params)=> params.minPrice)
  @IsPositive()
  maxPrice: number;
}