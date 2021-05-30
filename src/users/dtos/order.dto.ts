import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsArray, IsDate, IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length } from "class-validator";

export class CreateOrderDto{
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @IsNotEmpty()
  @IsString()
  readonly DNI: string;
  
  @IsNotEmpty()
  @IsString()
  readonly state: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsNumber()
  readonly postal: number;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  
  @IsArray()
  @IsNotEmpty()
  readonly products: object[];
  
  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @IsNotEmpty()
  @IsString()
  readonly date: string;
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products'])
){}

export class AddProductsToOrderDto{
   @IsArray()
   @IsNotEmpty()
  readonly productsIds: object[];
}
