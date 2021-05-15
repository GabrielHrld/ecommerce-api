import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsArray, IsDate, IsEmail, IsMongoId, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateOrderDto{
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products'])
){}

export class AddProductsToOrderDto{
   @IsArray()
   @IsNotEmpty()
  readonly productsIds: string[];
}